import { ApolloCache } from '@apollo/client'
import {
  CreateArticleMutation,
  GetArticleOneQuery,
  GetArticlesQuery,
  UpdateArticleMutationVariables,
  UpsertBlocksMutation,
  UpsertBlocksMutationVariables,
} from 'generated/graphql'
import produce from 'immer'

import GET_ARTICLE_ONE from 'queries/articles/GET_ARTICLE_ONE.gql'

interface IParams {
  blockId?: number | null
  articleId: number
  articleSlug: string
  parentId?: number | null
  payload: string
  type: string
}

export const createUpsertMutationParams = (variables: UpsertBlocksMutationVariables) => {
  let returning = null
  if (Array.isArray(variables.objects)) {
    returning = variables.objects.map((item) => ({
      __typename: 'blocks',
      id: Math.round(Math.random() * -1000000),
      ...item,
    }))
  } else {
    returning = variables
  }

  return {
    variables,
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_blocks: {
        __typename: 'blocks_mutation_response',
        returning,
      },
    } as UpsertBlocksMutation,
    update: (cache: ApolloCache<UpsertBlocksMutation>, { data: dataRaw }: any) => {
      const article = dataRaw?.insert_articles_one
      if (!article) {
        return
      }

      const data = cache.readQuery<GetArticleOneQuery>({
        query: GET_ARTICLE_ONE,
        // TODO: update slug
        variables: { slug: '1234' },
      })
      // TODO: Update blocks
      // cache.writeQuery({
      //   query: GET_ARTICLE_ONE,
      // variables: { slug: '1234' },
      //   data: produce(data, (draftData: GetArticleOneQuery) => {
      //     const [article] = draftData.articles.filter((item) => item.id === articleId)
      //     const [block] = article.blocks.filter((item) => item.id === articleId)
      //     block.payload = payload
      //     block.type = type
      //     // block.parent_id = parentId
      //   }),
      // })
    },
  }
}
