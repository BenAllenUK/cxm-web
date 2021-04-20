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
  BUTTON,
  TEXT_INPUT,
  // TWEET = 'TWEET',
  // GOOGLE_MAPS = 'GOOGLE-MAPS',
  H4,
  H5,
}

export type BlockData =
  | BlockDataText
  | BlockDataButton
  | BlockDataMedia
  | BlockDataH1
  | BlockDataH2
  | BlockDataH3
  | BlockDataH4
  | BlockDataH5
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

export type BlockDataTextInput = {
  value: string
}

export type BlockDataButton = {
  text: string
  value: string
}

export type BlockDataMedia = {
  value: string | null
  fileName: string | null
  fileSize: number | null
  sourceType: MediaSourceType
  caption?: string | null
}

export type BlockDataMediaUpload = {
  file: File
  id: number
  progress?: number | null
  blockType: BlockType
}

export enum MediaSourceType {
  UPLOAD = 'UPLOAD',
  EMBED_LINK = 'EMBED_LINK',
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

export type BlockDataH4 = BlockDataText

export type BlockDataH5 = BlockDataText

export type BlockDataTableInline = {
  title: string
  colNames: string[]
  rows: string[][]
}

export type BlockDataCheckBullet = {
  value: { value: string; selected: boolean }[]
}

export type BlockDataListBullet = {
  value: { value: string }[]
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
