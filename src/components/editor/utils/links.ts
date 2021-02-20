export const isURL = (text: string) => {
  return text.indexOf('http://') > -1 || text.indexOf('https://') > -1
}
