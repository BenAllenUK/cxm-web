import React from 'react'

import TextInput, { TextInputEvent } from 'components/common/TextInput'
import { BlockData, BlockDataText, BlockType, Block } from '../../types'

import { BlockTypeProperties } from '.'
import styles from './Text.module.scss'

class Text extends React.Component<IProps> {
  onValueChange = (event: TextInputEvent) => {
    const { content, onUpdate } = this.props

    const value = event.target.value.replace('&nbsp;', ' ')

    onUpdate({
      value,
    })
  }

  renderStyle = (type: BlockType) => {
    switch (type) {
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

  renderFocusedPlaceholder = (type: BlockType) => {
    const { filteringMode } = this.props

    switch (type) {
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

  renderBlurredPlaceholder = (type: BlockType) => {
    switch (type) {
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
    const { content, type, onDelete, onNew, filteringMode } = this.props

    switch (e.key) {
      case 'Backspace':
        if (content.value.length === 0 && !e.shiftKey) {
          e.preventDefault()
          onDelete()
        }
        return
      case 'Enter':
        if (!filteringMode && type !== BlockType.CODE && !e.shiftKey) {
          e.preventDefault()
          onNew()
        }
        return
      case 'Tab':
        if (type === BlockType.CODE) {
          document.execCommand('insertHTML', false, '&#009')
          e.preventDefault()
        }
        return
    }
  }

  render() {
    const { content, type, tabIndex, innerRef, onFocus, onBlur } = this.props
    const html = content.value

    const className = this.renderStyle(type)
    const focusedPlaceholder = this.renderFocusedPlaceholder(type)
    const blurredPlaceholder = this.renderBlurredPlaceholder(type)
    const initialHeight = BlockTypeProperties[type].initialHeight

    return (
      <div
        className={className}
        style={{ minHeight: initialHeight }}
        data-gramm_editor={type === BlockType.CODE ? 'false' : 'true'}
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
  type: BlockType
  content: BlockDataText
  filteringMode: boolean
  disabled?: boolean

  onNew: () => void
  onUpdate: (arg0: BlockDataText) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}

export default Text
