import { ApolloCache, FetchResult } from '@apollo/client'
import {
  ArticlesInsertInput,
  CreateArticleMutation,
  CreateArticleMutationVariables,
  UpsertArticlesMutationVariables,
} from 'generated/graphql'

import BLOCK_FRAGMENT from 'queries/blocks/BLOCK_FRAGMENT.gql'
import ARTICLE_FRAGMENT from 'queries/articles/ARTICLE_FRAGMENT.gql'

export const createArticleMutationParams = (projectId: number, variables: UpsertArticlesMutationVariables) => {
  const { blocks, ...articleParams } = variables.objects as ArticlesInsertInput
  const id = Math.round(Math.random() * -1000000)

  return {
    variables,
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_articles_one: {
        ...articleParams,
        __typename: 'articles',
        id,
        blocks: blocks?.data,
      },
    } as CreateArticleMutation,
    update: (cache: ApolloCache<CreateArticleMutation>, result: FetchResult<CreateArticleMutation>) => {
      const article = result.data?.insert_articles_one
      if (!article) {
        return []
      }
      return
      cache.modify({
        id: `projects:${projectId}`,
        fields: {
          articles(articlesRef = [], { readField }) {
            const newBlockRefs = article.blocks.map((item) => {
              const id = Math.round(Math.random() * -1000000)
              return cache.writeFragment({
                id: `blocks:${id}`,
                data: {
                  ...item,
                  id,
                  updatedAt: new Date().toISOString(),
                  createdAt: new Date().toISOString(),
                },
                fragment: BLOCK_FRAGMENT,
              })
            })

            const newArticleRef = cache.writeFragment({
              id: cache.identify(article),
              data: {
                ...article,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                blocks: newBlockRefs,
              },
              fragment: ARTICLE_FRAGMENT,
            })

            if (articlesRef.some((ref: any) => readField('id', ref) === article.id)) {
              return articlesRef
            }

            return [...articlesRef, newArticleRef]
          },
        },
      })
    },
  }
}
