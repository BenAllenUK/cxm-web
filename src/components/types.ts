export enum BlockType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  LIST_BULLET = 'LIST_BULLET',
  // TABLE_INLINE = 'TABLE-INLINE',
  // LIST_CHECK = 'LIST_CHECK',
  // LIST_NUMBER = 'LIST_NUMBER',
  // QUOTE = 'QUOTE',
  // DIVIDER = 'DIVIDER',
  // CALLOUT = 'CALLOUT',
  // VIDEO = 'VIDEO',
  // CODE = 'CODE',
  // TWEET = 'TWEET',
  // GOOGLE_MAPS = 'GOOGLE-MAPS',
}

export type BlockData =
  | BlockDataText
  | BlockDataImage
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

export type BlockDataDefault = {
  type: BlockType
}

export type BlockDataText = BlockDataDefault & {
  value: string
}

export type BlockDataImage = BlockDataDefault & {
  source: string
  alt: string
  imageType: BlockDataImageType
}

export enum BlockDataImageType {
  CUSTOM = 'CUSTOM',
  UNSPLASH = 'UNSPLASH',
}

export type BlockDataH1 = BlockDataDefault & BlockDataText

export type BlockDataH2 = BlockDataDefault & BlockDataText

export type BlockDataH3 = BlockDataDefault & BlockDataText

export type BlockDataTableInline = BlockDataDefault & {
  title: string
  colNames: string[]
  rows: string[][]
}

export type BlockDataCheckBullet = BlockDataDefault & {
  items: string[]
  selected: boolean[]
}

export type BlockDataListBullet = BlockDataDefault & {
  items: string[]
}

export type BlockDataNumberBullet = BlockDataDefault & BlockDataListBullet

export type BlockDataQuote = BlockDataDefault & BlockDataText

export type BlockDataDivider = BlockDataDefault

export type BlockDataCallout = BlockDataDefault & BlockDataText

export type BlockDataVideo = BlockDataDefault & {
  url: string
  alt: string
  type: string
}

export enum BlockDataVideoType {
  CUSTOM = 'CUSTOM',
  YOUTUBE = 'YOUTUBE',
}

export type BlockDataCode = BlockDataDefault & BlockDataText

export type BlockDataTweet = BlockDataDefault & {
  value: string
  url: string
}

export type BlockDataGoogleMaps = BlockDataDefault & {
  lat: string
  long: string
}
