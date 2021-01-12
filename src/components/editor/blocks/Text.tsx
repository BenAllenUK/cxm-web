import React from 'react'

import TextInput, { TextInputEvent } from 'components/common/TextInput'
import { BlockData, BlockDataText, BlockType } from '../../types'

import { BlockTypeProperties } from '.'
import styles from './Text.module.scss'

class Text extends React.Component<IProps> {
  onValueChange = (event: TextInputEvent) => {
    const { content, onUpdate } = this.props

    const value = event.target.value.replace('&nbsp;', ' ')
    const block = {
      ...content,
      value,
    }

    onUpdate(block)
  }

  renderStyle = (content: BlockDataText) => {
    switch (content.type) {
      case BlockType.H1:
        return styles.header1
      case BlockType.H2:
        return styles.header2
      case BlockType.H3:
        return styles.header3
      case BlockType.QUOTE:
        return styles.quote
      case BlockType.CODE:
        return styles.code
      case BlockType.CALLOUT:
        return styles.callout
      default:
        return styles.text
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
      case BlockType.QUOTE:
        return `Empty quote`
      case BlockType.CALLOUT:
        return `Type something...`
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
      case BlockType.QUOTE:
        return `Empty quote`
      case BlockType.CALLOUT:
        return `Type something...`
      default:
        return ''
    }
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { content, onDelete, onNew, filteringMode } = this.props

    switch (e.key) {
      case 'Backspace':
        if (content.value.length === 0 && !e.shiftKey) {
          e.preventDefault()
          onDelete()
        }
        return
      case 'Enter':
        if (!filteringMode && content.type !== BlockType.CODE && !e.shiftKey) {
          e.preventDefault()
          onNew()
        }
        return
      case 'Tab':
        if (content.type === BlockType.CODE) {
          document.execCommand('insertHTML', false, '&#009')
          e.preventDefault()
        }
        return
    }
  }

  render() {
    const { content, tabIndex, innerRef, onFocus, onBlur } = this.props
    const html = content.value

    const className = this.renderStyle(content)
    const focusedPlaceholder = this.renderFocusedPlaceholder(content)
    const blurredPlaceholder = this.renderBlurredPlaceholder(content)
    const initialHeight = BlockTypeProperties[content.type].initialHeight

    return (
      <div
        className={className}
        style={{ minHeight: initialHeight }}
        data-gramm_editor={content.type === BlockType.CODE ? 'false' : 'true'}
      >
        <TextInput
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
      </div>
    )
  }
}

interface IProps {
  innerRef?: (ref: any | null) => void
  tabIndex?: number
  content: BlockDataText
  filteringMode: boolean
  disabled?: boolean

  onNew: () => void
  onUpdate: (arg0: BlockData) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}

export default Text
