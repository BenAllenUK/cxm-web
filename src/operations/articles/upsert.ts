import { ArticleFragment, useUpsertArticlesMutation } from 'generated/graphql'

import ARTICLE_FRAGMENT from 'queries/articles/ARTICLE_FRAGMENT.gql'
import { ArticleBlocksFragment } from 'types/types'
import { uniqBy } from 'lodash'

/**
 * Notes:
 * - make sure not to pass in __typename to variables
 * - make sure to pass in  __typename to write fragment
 * - make sure source object has an id (randomly generated if not known)
 * - use `id < 0 ? undefined : id` to allow server to generate id
 */

const useUpsertArticlesMutationScoped = (
  projectId: number | undefined,
  upsertFunc: ReturnType<typeof useUpsertArticlesMutation>[0]
) => {
  return async (articles: ArticleBlocksFragment[]) => {
    if (!projectId) {
      return
    }

    const { data } = await upsertFunc({
      variables: {
        objects: articles.map((item) => {
          const { __typename, id, ...itemData } = item
          return {
            ...itemData,
            id: id < 0 ? undefined : id,
            projectId,
            blocks: {
              data: (item.blocks || []).map((subItem) => {
                const { __typename, id: blockId, articleId, ...blockData } = subItem
                return { ...blockData, id: blockId < 0 ? undefined : blockId, payload: JSON.stringify(subItem.payload) }
              }),
            },
          }
        }),
      },
      optimisticResponse: {},
      update: (cache, { data }) => {
        const items = data?.insert_articles?.returning || articles

        const newRefs = items.map((item: ArticleBlocksFragment) => {
          const { __typename, blocks, ...itemData } = item
          return cache.writeFragment({
            id: `articles:${item.id}`,
            fragment: ARTICLE_FRAGMENT,
            data: { ...itemData },
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

    return data?.insert_articles?.returning
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
