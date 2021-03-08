const Routes = {
  admin: {
    editor: {
      path: (slug1: string, path: string) => {
        return `/${slug1}/editor/${path}`
      },
    },
  },
}

export default Routes
