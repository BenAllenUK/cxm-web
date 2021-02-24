export const navigate = (path: string) => {
  window.history.pushState({}, '', path)
}

export const navigateReplace = (path: string) => {
  window.history.replaceState({}, '', path)
}
