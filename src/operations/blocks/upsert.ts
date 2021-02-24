import { BlockFragment, useUpsertBlocksMutation } from 'generated/graphql'
import { uniqBy } from 'lodash'

import BLOCK_FRAGMENT from 'queries/blocks/BLOCK_FRAGMENT.gql'

const useUpsertBlocksMutationScoped = (
  articleId: number | undefined,
  upsertFunc: ReturnType<typeof useUpsertBlocksMutation>[0]
) => {
  return async (blocks: BlockFragment[]) => {
    if (!articleId) {
      return
    }

    return upsertFunc({
      optimisticResponse: {},
      variables: {
        articleId,
        objects: blocks.map((item) => {
          const { __typename, ...itemData } = item
          return itemData
        }),
      },
      update: (cache, { data }) => {
        const items = data?.insert_blocks?.returning || blocks
        const newRefs = items.map((item: any) => {
          const { __typename, ...itemData } = item
          return cache.writeFragment({
            id: `blocks:${item.id || Math.round(Math.random() * -1000000)}`,
            fragment: BLOCK_FRAGMENT,
            data: itemData,
          })
        })

        cache.modify({
          id: `articles:${articleId}`,
          fields: {
            blocks(existingRefs = []) {
              return uniqBy([...existingRefs, ...newRefs], '__ref')
            },
          },
        })
      },
    })
  }
}

export default useUpsertBlocksMutationScoped

export type UpsertBlocksMutationScopedFunc = ReturnType<typeof useUpsertBlocksMutationScoped>
