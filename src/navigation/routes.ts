export enum Subdomain {
  Root = 1,
  Admin,
  Docs,
  Hosted,
  Api,
}

const Routes = {
  root: {
    getApp: `/app`,
    logout: `/logout`,
  },
  admin: {
    editor: `/{projectSlug}/editor/{path}`,
  },
}

export default Routes
