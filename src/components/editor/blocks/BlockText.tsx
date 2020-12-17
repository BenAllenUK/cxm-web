import React from 'react'
import { BlockDataText, BlockType, IBlockProps } from 'types/editor'
import TextInput, { TextInputEvent } from 'components/core/ui/TextInput'
import BlockContainer from './BlockContainer'

class BlockText extends React.Component<IProps> {
  onValueChange = (event: TextInputEvent) => {
    const { onUpdate, onNew, content } = this.props

    const inputEvent = event.nativeEvent as InputEvent
    if (inputEvent.inputType === 'insertParagraph') {
      console.log(inputEvent.inputType)
      onNew()
      return
    }

    const block = {
      ...content,
      value: event.target.value,
    }

    onUpdate(block)
  }

  onDelete = () => {
    const { onDelete } = this.props
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

  initialHeight = (type: BlockType) => {
    switch (type) {
      case BlockType.H1:
        return 38
      case BlockType.H2:
        return 29
      case BlockType.H3:
        return 23
      default:
        return 19
    }
  }

  render() {
    const { content, onClick, onDoubleClick, onAddClick, sortMode } = this.props
    const html = this.renderHtml(content)
    const initialHeight = this.initialHeight(content.type)
    return (
      <BlockContainer
        initialHeight={initialHeight}
        onClick={onClick}
        onAddClick={onAddClick}
        onDoubleClick={onDoubleClick}
        sortMode={sortMode}
      >
        <TextInput html={html} onChange={this.onValueChange} />
      </BlockContainer>
    )
  }
}

interface IProps extends IBlockProps {
  content: BlockDataText
}

export default BlockText
