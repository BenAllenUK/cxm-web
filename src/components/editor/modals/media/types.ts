export type MediaSourceObject = {
  name: string
  accessKey?: string
  secretKey?: string
  type: MediaSourceType
}

export enum MediaSourceType {
  UPLOAD = 'Upload',
  EMBED_LINK = 'Embed link',
  LIBRARY = 'LIBRARY',
}
