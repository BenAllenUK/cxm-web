import type {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext
} from 'next'

import type { AppProps as NextJsAppProps } from 'next/app'

export interface ArticleRaw {
  blocks: BlockRaw[]
}

export interface BlockRaw {
  payload: string
}

export type Article = {
  id: number
  parentId?: number | null
  title: string
  updatedAt: string
  createdAt: string
  archived: boolean
  archivedAt?: string
  position: number
  blocks?: Block[]
  path: string
}

export type AppPropsWithOmnea = NextJsAppProps & ComponentProps

export type WithOmneaStaticProps = (
  handler: GetStaticProps
) => (context: GetStaticPropsContext) => {}

export type WithOmneaStaticPaths = (
  handler: GetStaticPaths
) => (context: GetStaticPathsContext) => {}

export type WithOmneaPage = (
  WrappedComponent:
    | React.ComponentType<NextJsAppProps>
    | React.ElementType<NextJsAppProps>
) => React.ComponentType<NextJsAppProps> | React.ElementType<NextJsAppProps>

export type WithOmneaCustomPage = (
  WrappedComponent:
    | React.ComponentType<AppPropsWithOmnea>
    | React.ElementType<AppPropsWithOmnea>
) =>
  | React.ComponentType<AppPropsWithOmnea>
  | React.ElementType<AppPropsWithOmnea>

export interface Client {
  withOmneaPage: WithOmneaPage
  withOmneaStaticPaths: WithOmneaStaticPaths
  withOmneaStaticProps: WithOmneaStaticProps
  withOmneaCustomPage: WithOmneaCustomPage
}

export interface ComponentProps {
  article?: Article | null
  articles?: Article[]
}

export interface Config {
  rootUrl: string
  projectSlug: string
  secretKey: string
}

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
  H5
}

export type BlockData =
  | BlockDataText
  | BlockDataButton
  | BlockDataTextInput
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
  | BlockDataCode
  | BlockDataTweet
  | BlockDataGoogleMaps

export type BlockDataMedia = {
  value: any
  fileName: string | null
  fileSize: number | null
  sourceType: MediaSourceType
  caption?: string | null
}

export enum MediaSourceType {
  UPLOAD = 'UPLOAD',
  EMBED_LINK = 'EMBED_LINK',
  LIBRARY = 'LIBRARY',
  CLOUDINARY = 'CLOUDINARY',
  LOCAL = 'LOCAL',
  VIDEO = 'VIDEO'
}

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

export type BlockDataCode = BlockDataText

export type BlockDataTweet = {
  value: string
  url: string
}

export type BlockDataGoogleMaps = {
  lat: string
  long: string
}
