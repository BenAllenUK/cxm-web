import { ApolloCache } from '@apollo/client'
import {
  Blocks,
  CreateArticleMutation,
  CreateArticleMutationVariables,
  GetArticlesQuery,
  GetProjectOneQuery,
} from 'generated/graphql'
import produce from 'immer'

import GET_PROJECT_ONE from 'queries/project/GET_PROJECT_ONE.gql'

export const createArticleMutationParams = (variables: CreateArticleMutationVariables) => {
  return {
    variables,
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_articles_one: {
        __typename: 'articles',
        id: Math.round(Math.random() * -1000000),
        ...variables,
      },
    } as CreateArticleMutation,
    update: (cache: ApolloCache<CreateArticleMutation>, { data: dataRaw }: any) => {
      const article = dataRaw?.insert_articles_one
      if (!article) {
        return
      }

      const data = cache.readQuery<GetProjectOneQuery>({
        query: GET_PROJECT_ONE,
        // TODO: Change to id
        variables: { slug: 'gimme' },
      })

      const newData = produce(data, (draftData: GetProjectOneQuery) => {
        const { __typename, id, parent_id, slug, title } = article
        draftData.projects[0].articles.push({
          __typename,
          id,
          parent_id,
          slug,
          title,
        })
      })

      cache.writeQuery({
        query: GET_PROJECT_ONE,
        data: newData,
        variables: { slug: 'gimme' },
      })
    },
  }
}
