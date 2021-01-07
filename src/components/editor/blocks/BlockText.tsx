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

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { content, onDelete, onNew } = this.props
    if (e.key === 'Backspace' && content.value.length === 0) {
      onDelete()
      e.preventDefault()
    } else if (e.key === 'Enter') {
      onNew()
      // TODO: Disable when menu is open
      e.preventDefault()
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
      onFocus,
      onBlur,
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
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={this.onKeyDown}
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
  onFocus: () => void
  onBlur: () => void
}

const H1TextStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
}

const H2TextStyle = {
  fontSize: '1.5em',
  fontWeight: 'bold',
}

const H3TextStyle = {
  fontSize: '1.17em',
  fontWeight: 'bold',
}

export default BlockText
