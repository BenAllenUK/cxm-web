import React from 'react'
import { BlockDataText, BlockType, IBlockProps } from 'types/editor'
import TextInput from 'components/core/ui/TextInput'
import BlockContainer from './BlockContainer'

class BlockText extends React.Component<IProps> {
  onValueChange = (event: any) => {
    const { onUpdate, content } = this.props

    if (!onUpdate) return

    const block = {
      ...content,
      value: event.target.value,
    }

    onUpdate(block)
  }

  onDelete = () => {
    const { onDelete } = this.props
    if (!onDelete) return

    onDelete()
  }

  renderHtml = (content: BlockDataText) => {
    switch (content.type) {
      case BlockType.H1:
        return `<h1>${content.value}</h1>`
      case BlockType.H2:
        return `<h2>${content.value}</h2>`
      case BlockType.H3:
        return `<h3>${content.value}</h3>`
      default:
        return content.value
    }
  }

  render() {
    const { content, onBlockDoubleClick } = this.props
    const html = this.renderHtml(content)
    return (
      <BlockContainer onBlockDoubleClick={onBlockDoubleClick}>
        <TextInput html={html} onChange={this.onValueChange} />
      </BlockContainer>
    )
  }
}

interface IProps extends IBlockProps {
  content: BlockDataText
}

export default BlockText
