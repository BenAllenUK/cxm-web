import { ApolloCache, FetchResult } from '@apollo/client'
import { UpsertBlocksMutation, UpsertBlocksMutationVariables } from 'generated/graphql'

import BLOCK_FRAGMENT from 'queries/blocks/BLOCK_FRAGMENT.gql'

export const createUpsertMutationParams = (
  articleId: number,
  variables: UpsertBlocksMutationVariables
) => {
  let returning = null
  if (Array.isArray(variables.objects)) {
    returning = variables.objects.map((item) => ({
      __typename: 'blocks',
      ...item,
      id: item.id || Math.round(Math.random() * -1000000),
    }))
  } else {
    returning = variables
  }
  // TODO Delete all old references related to this article
  return {
    variables,
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_blocks: {
        __typename: 'blocks_mutation_response',
        returning,
      },
    } as UpsertBlocksMutation,
    update: (
      cache: ApolloCache<UpsertBlocksMutation>,
      result: FetchResult<UpsertBlocksMutation>
    ) => {
      const blocks = result.data?.insert_blocks?.returning
      if (!blocks) {
        return
      }
      cache.modify({
        id: `articles:${articleId}`,
        fields: {
          blocks(blocksRef = [], { readField }) {
            const newBlockRefs = blocks.map((item) => {
              const id = item.id ?? Math.round(Math.random() * -1000000)
              const newRef = cache.writeFragment({
                id: `blocks:${id}`,
                data: {
                  ...item,
                  id,
                  updatedAt: new Date().toISOString(),
                  createdAt: new Date().toISOString(),
                },
                fragment: BLOCK_FRAGMENT,
              })

              // const existingRef = blocksRef.filter((ref: any) => readField('id', ref) === item.id)
              // if (existingRef) {
              //   return existingRef
              // }
              return newRef
            })
            return newBlockRefs
          },
        },
      })
    },
  }
}
