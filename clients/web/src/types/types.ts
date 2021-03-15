import { ArticleFragment, BlockFragment, ProjectFragment, OrganisationFragment } from 'generated/graphql'

export type OrganisationProjectFragment = OrganisationFragment & { projects?: ProjectFragment[] }
export type ProjectArticleFragment = ProjectFragment & { articles?: ArticleFragment[] }
export type ProjectArticleWithArchivedFragment = ProjectFragment & {
  articles?: ArticleFragment[]
  archivedArticles?: ArticleFragment[]
}
export type ArticleBlocksFragment = ArticleFragment & { blocks?: BlockFragment[] }
