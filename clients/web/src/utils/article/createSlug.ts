export function createSlug(path: string) {
  return encodeURI(path.toLowerCase().replaceAll(' ', '-'))
}
