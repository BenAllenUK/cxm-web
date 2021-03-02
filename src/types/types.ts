import { ArticleFragment, BlockFragment } from 'generated/graphql'

export type ArticleBlocksFragment = ArticleFragment & { blocks?: BlockFragment[] }
