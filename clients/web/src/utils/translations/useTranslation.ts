const useTranslation = (modules: string[]) => {
  return {
    t: (value: string, variables: object = {}) => {
      return value
    },
  }
}

export default useTranslation
