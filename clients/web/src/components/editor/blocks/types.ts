export enum BlockType {
  IMAGE = 0,
  TEXT,
  H1,
  H2,
  H3,
  LIST_BULLET,
  // TABLE_INLINE = 'TABLE-INLINE',
  LIST_CHECK,
  LIST_NUMBER,
  QUOTE,
  DIVIDER,
  CALLOUT,
  CODE,
  FILE,
  VIDEO,
  // TWEET = 'TWEET',
  // GOOGLE_MAPS = 'GOOGLE-MAPS',
}

export type BlockData =
  | BlockDataText
  | BlockDataMedia
  | BlockDataH1
  | BlockDataH2
  | BlockDataH3
  | BlockDataTableInline
  | BlockDataCheckBullet
  | BlockDataListBullet
  | BlockDataNumberBullet
  | BlockDataQuote
  | BlockDataDivider
  | BlockDataCallout
  | BlockDataVideo
  | BlockDataCode
  | BlockDataTweet
  | BlockDataGoogleMaps

export type Block = {
  id: number
  type: BlockType
  parentId?: number | null
  editingUserId?: number | null
  payload: BlockData
  createdAt: string
  updatedAt: string
  position: number
}

export type BlockDataText = {
  value: string
}

export type BlockDataMedia = {
  value: any
  fileName: string
  fileSize: number
  sourceType: MediaSourceType
  caption?: string | null
  comments?: BlockDataMediaComment[]
}

export type BlockDataMediaComment = {
  user: string
  comment: string
  time: string
}

export type BlockDataMediaUpload = {
  file: File
  id: number
  progress?: number | null
  blockType: BlockType
}

export enum MediaSourceType {
  UPLOAD = 'Upload',
  EMBED_LINK = 'EMBED LINK',
  LIBRARY = 'LIBRARY',
  CLOUDINARY = 'CLOUDINARY',
  LOCAL = 'LOCAL',
  VIDEO = 'VIDEO',
}

export type MediaSourceObject = {
  name: string
  accessKey?: string
  secretKey?: string
  type: MediaSourceType
}

export type BlockDataH1 = BlockDataText

export type BlockDataH2 = BlockDataText

export type BlockDataH3 = BlockDataText

export type BlockDataTableInline = {
  title: string
  colNames: string[]
  rows: string[][]
}

export type BlockDataCheckBullet = {
  items: { value: string; selected: boolean }[]
}

export type BlockDataListBullet = {
  items: { value: string }[]
}

export type BlockDataNumberBullet = BlockDataListBullet

export type BlockDataQuote = BlockDataText

export type BlockDataDivider = {}

export type BlockDataCallout = BlockDataText

export type BlockDataVideo = {
  url: string
  alt: string
  type: string
}

export enum BlockDataVideoType {
  CUSTOM = 'CUSTOM',
  YOUTUBE = 'YOUTUBE',
}

export type BlockDataCode = BlockDataText

export type BlockDataTweet = {
  value: string
  url: string
}

export type BlockDataGoogleMaps = {
  lat: string
  long: string
}
