import { ApolloCache } from '@apollo/client'
import { CreateArticleMutation, GetArticlesQuery } from 'generated/graphql'
import produce from 'immer'

import GET_ARTICLES from './GET_ARTICLES.gql'

interface IParams {
  projectId: number
  parentId: number | null
  title: string
  slug: string
}

export const createArticleMutationParams = ({
  projectId,
  parentId = null,
  title,
  slug,
}: IParams) => {
  return {
    variables: {
      projectId: projectId,
      parentId: parentId,
      title,
      slug,
    },
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_articles_one: {
        __typename: 'articles',
        id: Math.round(Math.random() * -1000000),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        parent_id: parentId,
        project_id: projectId,
        title,
        slug,
      },
    } as CreateArticleMutation,
    update: (cache: ApolloCache<CreateArticleMutation>, { data: dataRaw }: any) => {
      const article = dataRaw?.insert_articles_one
      if (!article) {
        return
      }

      const data = cache.readQuery<GetArticlesQuery>({
        query: GET_ARTICLES,
        variables: { projectId },
      })

      cache.writeQuery({
        query: GET_ARTICLES,
        data: produce(data, (draftData: GetArticlesQuery) => {
          draftData.projects_by_pk?.articles.push(article)
        }),
      })
    },
  }
}
