import { useUpsertArticlesMutation } from 'generated/graphql'

import ARTICLE_FRAGMENT from 'queries/articles/ARTICLE_FRAGMENT.gql'
import { ArticleBlocksFragment } from 'types/types'
import { uniqBy } from 'lodash'

const useUpsertArticlesMutationScoped = (
  projectId: number | undefined,
  upsertFunc: ReturnType<typeof useUpsertArticlesMutation>[0]
) => {
  return async (articles: ArticleBlocksFragment[]) => {
    if (!projectId) {
      return
    }

    return upsertFunc({
      variables: {
        objects: articles.map((item) => {
          const { __typename, ...itemData } = item
          return {
            ...itemData,
            projectId,
            blocks: { data: (item.blocks || []).map((subItem) => ({ ...subItem, payload: JSON.stringify(subItem.payload) })) },
          }
        }),
      },
      optimisticResponse: {},
      update: (cache, { data }) => {
        const items = data?.insert_articles?.returning || articles

        const newRefs = items.map((item: any) => {
          const { __typename, blocks, ...itemData } = item
          console.log(itemData)
          return cache.writeFragment({
            id: `articles:${item.id || Math.round(Math.random() * -1000000)}`,
            fragment: ARTICLE_FRAGMENT,
            data: itemData,
          })
        })

        const archivedItems = items.filter((item) => item.archived).map((item) => item.id)
        cache.modify({
          id: `projects:${projectId}`,
          fields: {
            articles(existingRefs = [], { readField, storeFieldName }) {
              // TODO: This is way too hacky. Reach out to apollo
              const isArchivedField = storeFieldName === `articles({"where":{"archived":{"_eq":true}}})`
              if (!isArchivedField) {
                return unArchivedArticles(newRefs, existingRefs, archivedItems, { readField })
              } else {
                return archivedArticles(newRefs, existingRefs, archivedItems, { readField })
              }
            },
          },
        })
      },
    })
  }
}

export default useUpsertArticlesMutationScoped

export type UpsertArticlesMutationScopedFunc = ReturnType<typeof useUpsertArticlesMutationScoped>
export type UpsertArticlesMutationScopedResponse = ReturnType<ReturnType<typeof useUpsertArticlesMutationScoped>>

const unArchivedArticles = (newRefs: any, existingRefs: any = [], archivedItems: any, { readField }: any) => {
  const existingRefsFiltered = existingRefs.filter((itemRef: any) => {
    const id = Number(readField('id', itemRef))
    return archivedItems.indexOf(id) === -1
  })

  const newRefsArchived = newRefs.filter((itemRef: any) => {
    const id = Number(readField('id', itemRef))
    return archivedItems.indexOf(id) === -1
  })

  const mergedRefs = uniqBy([...existingRefsFiltered, ...newRefsArchived], '__ref')
  return mergedRefs
}

const archivedArticles = (newRefs: any, existingRefs: any = [], archivedItems: any, { readField }: any) => {
  const existingRefsFiltered = existingRefs.filter((itemRef: any) => {
    const id = Number(readField('id', itemRef))
    return archivedItems.indexOf(id) > -1
  })

  const newRefsArchived = newRefs.filter((itemRef: any) => {
    const id = Number(readField('id', itemRef))
    return archivedItems.indexOf(id) > -1
  })

  const mergedRefs = uniqBy([...existingRefsFiltered, ...newRefsArchived], '__ref')
  return mergedRefs
}
