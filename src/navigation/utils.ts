export enum Subdomain {
  Root = 1,
  Admin,
  Docs,
  Hosted,
}

export const navigate = (module: Subdomain, path: string) => {
  window.history.pushState({}, '', path)
}

export const navigateReplace = (path: string) => {
  window.history.replaceState({}, '', path)
}
