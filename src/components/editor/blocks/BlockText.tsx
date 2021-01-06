import React, { RefObject } from 'react'
import styled from 'styled-components'
import { BlockData, BlockDataText, BlockType } from 'types/editor'
import TextInput, { TextInputEvent } from 'components/core/ui/TextInput'
import BlockContainer from './BlockContainer'
import { Point } from 'types'
import { BlockInitialHeight, BlockTypeLabels } from '.'

class BlockText extends React.Component<IProps> {
  onValueChange = (event: TextInputEvent) => {
    const { onUpdate, onNew, content, onCommandUpdate } = this.props

    const inputEvent = event.nativeEvent as InputEvent
    if (inputEvent.inputType === 'insertParagraph') {
      onNew()
      return
    }

    const value = event.target.value.replace('&nbsp;', ' ')
    const block = {
      ...content,
      value,
    }

    console.log(value)

    onUpdate(block)

    onCommandUpdate(value.toLowerCase())
  }

  renderStyle = (content: BlockDataText) => {
    switch (content.type) {
      case BlockType.H1:
        return H1TextStyle
      case BlockType.H2:
        return H2TextStyle
      case BlockType.H3:
        return H3TextStyle
      default:
        return {}
    }
  }

  renderFocusedPlaceholder = (content: BlockDataText) => {
    const { filteringMode } = this.props

    switch (content.type) {
      case BlockType.H1:
        return `Heading 1`
      case BlockType.H2:
        return `Heading 2`
      case BlockType.H3:
        return `Heading 3`
      default:
        return filteringMode ? 'Type to filter' : `Type for '/' commands`
    }
  }

  renderBlurredPlaceholder = (content: BlockDataText) => {
    switch (content.type) {
      case BlockType.H1:
        return `Heading 1`
      case BlockType.H2:
        return `Heading 2`
      case BlockType.H3:
        return `Heading 3`
      default:
        return ''
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPress)
  }

  onKeyPress = (e: KeyboardEvent) => {
    const { content, onDelete } = this.props
    if (e.key === 'Backspace' && content.value.length === 0) {
      onDelete()
      return
    }
    if (e.key === 'Enter') {
      console.log('new')
    }
  }

  render() {
    const {
      content,
      onClick,
      onDoubleClick,
      onAddClick,
      enableHandle,
      innerRef,
      tabIndex,
    } = this.props
    const html = content.value

    const style = this.renderStyle(content)
    const focusedPlaceholder = this.renderFocusedPlaceholder(content)
    const blurredPlaceholder = this.renderBlurredPlaceholder(content)
    const initialHeight = BlockInitialHeight[content.type]

    return (
      <BlockContainer
        initialHeight={initialHeight}
        onClick={onClick}
        onAddClick={onAddClick}
        onDoubleClick={onDoubleClick}
        enableHandle={enableHandle}
      >
        <TextInput
          style={{ minHeight: initialHeight, ...style }}
          focusedPlaceholder={focusedPlaceholder}
          blurredPlaceholder={blurredPlaceholder}
          tabIndex={tabIndex}
          innerRef={innerRef}
          html={html}
          onChange={this.onValueChange}
        />
      </BlockContainer>
    )
  }
}

interface IProps {
  tabIndex?: number
  innerRef?: (ref: any | null) => void
  enableHandle?: boolean
  disabled?: boolean
  onNew: () => void
  onAddClick: () => void
  onUpdate: (arg0: BlockData) => void
  onDelete: () => void
  onClick: () => void
  onDoubleClick: (arg0: Point) => void
  content: BlockDataText
  filteringMode: boolean
  onCommandUpdate: (arg0: string) => void
}

const H1TextStyle = {
  fontSize: '2em',
  marginBlockStart: '0.67em',
  marginBlockEnd: '0.67em',
  fontWeight: 'bold',
}

const H2TextStyle = {
  fontSize: '1.5em',
  marginBlockStart: '0.83em',
  marginBlockEnd: '0.83em',
  fontWeight: 'bold',
}

const H3TextStyle = {
  fontSize: '1.17em',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
  fontWeight: 'bold',
}

export default BlockText
