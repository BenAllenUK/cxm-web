const Routes = {
  admin: {
    editor: {
      path: (slug1: string, slug2: string) => {
        return `/admin/${slug1}/editor/${slug2}`
      },
    },
  },
}

export default Routes
