import withInternalClient from './client'

const defaultClient = withInternalClient()

export const withOmneaStaticPaths = defaultClient.withOmneaStaticPaths
export const withOmneaStaticProps = defaultClient.withOmneaStaticProps
export const withOmneaPage = defaultClient.withOmneaPage
export const withOmneaCustomPage = defaultClient.withOmneaCustomPage
export const withClient = withInternalClient

import Content from './components/Content'
import BlockList from './components/articles/BlockList'
import BlockItem from './components/articles/BlockItem'
import Text from './components/articles/blocks/Text'
import Image from './components/articles/blocks/Image'
import Divider from './components/articles/blocks/Divider'
export { Content, BlockList, BlockItem, Text, Image, Divider }

export {
  AppPropsWithOmnea,
  Article,
  Block,
  BlockType,
  BlockDataText,
  BlockDataMedia
} from './types'
