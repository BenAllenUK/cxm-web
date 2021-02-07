import { ApolloCache, FetchResult } from '@apollo/client'
import {
  UpsertBlocksMutation,
  UpsertBlocksMutationVariables,
  DeleteBlockMutation,
  DeleteBlockMutationVariables,
} from 'generated/graphql'

import BLOCK_FRAGMENT from 'queries/blocks/BLOCK_FRAGMENT.gql'

export const deleteMutationParams = (articleId: number, id: number) => {
  return {
    variables: {
      id,
    },
    update: (cache: ApolloCache<DeleteBlockMutation>, result: FetchResult<DeleteBlockMutation>) => {
      cache.modify({
        id: `articles:${articleId}`,
        fields: {
          blocks(blockRefs = [], { readField }) {
            return blockRefs.filter((ref: any) => id !== readField('id', ref))
          },
        },
      })
    },
  }
}

export const createUpsertMutationParams = (articleId: number, variables: UpsertBlocksMutationVariables) => {
  return {
    variables,
    optimisticResponse: {
      __typename: 'mutation_root',
      insert_blocks: {
        __typename: 'blocks_mutation_response',
        returning: variables.objects,
      },
    } as UpsertBlocksMutation,
    update: (cache: ApolloCache<UpsertBlocksMutation>, result: FetchResult<UpsertBlocksMutation>) => {
      const blocks = result.data?.insert_blocks?.returning
      if (!blocks) {
        return
      }

      cache.modify({
        id: `articles:${articleId}`,
        fields: {
          blocks(blockRefs = [], { readField }) {
            const newBlockRefs = blocks.map((item) => {
              const [existingRef] = blockRefs.filter((ref: any) => readField('id', ref) === item.id)
              if (existingRef) {
                return existingRef
              }
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
              return newRef
            })
            return newBlockRefs
          },
        },
      })
    },
  }
}
