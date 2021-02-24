import { useDeleteBlocksMutation } from 'generated/graphql'

const useDeleteBlocksMutationScoped = (articleId: number, deleteFunc: ReturnType<typeof useDeleteBlocksMutation>[0]) => {
  return async (ids: number[]) => {
    return deleteFunc({
      variables: {
        ids,
      },
      optimisticResponse: {},
      update: (cache) => {
        ids.map((id) => {
          cache.modify({
            id: `articles:${articleId}`,
            fields: {
              blocks(blockRefs = [], { readField }) {
                return blockRefs.filter((ref: any) => id !== readField('id', ref))
              },
            },
          })
        })
      },
    })
  }
}

export type DeleteBlocksMutationScopedFunc = ReturnType<typeof useDeleteBlocksMutationScoped>

export default useDeleteBlocksMutationScoped
