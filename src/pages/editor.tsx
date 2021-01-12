import { BlockType } from 'components/types'
import Editor from 'components/editor'
import { initialState } from 'reducers'
import { Provider } from 'react-redux'

import { useStore } from '../store'
import Sidebar from 'components/navigation/sidebar'

const menu = [
  {
    id: 1,
    label: 'bar',
    isOpen: false,
    children: [
      { id: 2, isOpen: false, label: 'barA', children: [] },
      { id: 3, isOpen: false, label: 'barB', children: [] },
    ],
  },
  {
    id: 3,
    label: 'foo',
    isOpen: true,
    children: [
      { id: 3, isOpen: false, label: 'fooA', children: [] },
      { id: 3, isOpen: false, label: 'fooB', children: [] },
      {
        id: 3,
        label: 'fooC',
        isOpen: true,
        children: [
          { id: 3, isOpen: false, label: 'barA', children: [] },
          { id: 3, isOpen: false, label: 'barB', children: [] },
        ],
      },
    ],
  },
]

const sections = [
  { id: 1, label: 'SEGMENTS', items: [...menu] },
  { id: 2, label: 'FOO BAR', items: [...menu] },
  { id: 2, label: 'FOO BAR', items: [...menu] },
  { id: 2, label: 'FOO BAR', items: [...menu] },
]

export default function EditorPage({ blocks, initialReduxState }: any) {
  const store = useStore(initialReduxState)
  return (
    <Provider store={store}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Sidebar sections={sections} />
        <div style={{ flex: 1, height: '100vh', overflow: 'scroll' }}>
          <Editor blocks={blocks} />
        </div>
      </div>
    </Provider>
  )
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
    {
      type: BlockType.IMAGE,
      source: null,
    },
    { type: BlockType.DIVIDER, value: 'Divider' },
    { type: BlockType.CALLOUT, value: 'Callout' },
    { type: BlockType.QUOTE, value: 'Quote' },
    { type: BlockType.CODE, value: 'Code' },
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
