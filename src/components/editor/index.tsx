import React from 'react'
import styled from 'styled-components'
import Content from './Content'
import { BlockType } from 'types/editor'
import ReactTooltip from 'react-tooltip'

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`
// TAKE IN AN INPUT
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

const Editor = () => {
  // TODO: Receive updated version
  return (
    <>
      <Container>
        <Content blocks={blocks} />
      </Container>
      <ReactTooltip place="bottom" id="editor" getContent={(dataTip) => dataTip} effect="solid" />
    </>
  )
}

export default Editor
