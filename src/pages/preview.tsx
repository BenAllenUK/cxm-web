import { BlockType } from 'components/types'
import Blog from 'components/content'
import { initialState } from 'reducers'

export default function BlogPage({ blocks }: any) {
  return <Blog blocks={blocks} />
}

export function getStaticProps() {
  // Note that in this case we're returning the state directly, without creating
  // the store first (like in /pages/ssr.js), this approach can be better and easier
  const blocks = [
    { type: BlockType.H1, value: 'Header 1' },
    { type: BlockType.H2, value: 'Header 2' },
    { type: BlockType.H3, value: 'Header 3' },
    {
      type: BlockType.TEXT,
      value:
        'Keyword cannibalization is one of the major issues that has a detrimental effect on search engine rankings. When multiple pages on your website are targeting exactly the same keyword, they may eventually start competing against each other. Search engines will be forced to make a choice as to which page they should display in search results, and their choice may not be the one you want. If you are already suffering from cannibalization issues, you can use a 301 redirect. ',
    },
  ]

  return {
    props: {
      blocks,
      initialReduxState: {
        ...initialState,
        editor: {
          ...initialState.editor,
          blocks: blocks,
        },
      },
    },
  }
}
