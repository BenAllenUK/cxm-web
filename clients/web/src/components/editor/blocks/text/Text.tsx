import { forwardRef, memo, RefObject, SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react'

import TextInput, { TextInputEvent } from 'components/common/text-input/TextInput'
import { BlockData, BlockDataText, BlockType, Block } from '../types'

import { BlockTypeProperties } from '..'
import styles from './Text.module.scss'
import useKeyDown from 'utils/hooks/useKeyDown'
import mergeRefs from 'utils/refs/mergeRefs'
import useKeyUp from 'utils/hooks/useKeyUp'
import isFirstLine from 'utils/text/isFirstLine'
import isLastLine from 'utils/text/isLastLine'

const Text = forwardRef<HTMLDivElement, IProps>(
  (
    {
      value,
      type = BlockType.TEXT,
      filteringMode,
      tabIndex,
      onFocus,
      onBlur,
      onNew,
      onUpdate,
      onDelete,
      onSelect,
      onFocusOutStart,
      onFocusOutEnd,
    },
    forwardedRef
  ) => {
    const initialHeight = BlockTypeProperties[type].initialHeight

    const ref = useRef<HTMLDivElement>(null)

    const _onValueChange = useCallback(
      (event: TextInputEvent) => {
        const value = event.target.value
        onUpdate && onUpdate(value)
      },
      [onUpdate]
    )

    const className = getClassName(type)
    const blurredPlaceholder = getBlurredPlaceholder(type)
    const focusedPlaceholder = getFocusedPlaceholder(type, filteringMode)

    useKeyDown(
      'Backspace',
      ref,
      (e) => {
        if (!value && !e.shiftKey) {
          e.preventDefault()
          onDelete && onDelete()
        }
      },
      [value]
    )

    useKeyDown(
      'Enter',
      ref,
      (e) => {
        if (!filteringMode && type !== BlockType.CODE && !e.shiftKey) {
          e.preventDefault()
          onNew && onNew()
        }
      },
      [filteringMode, type]
    )

    useKeyDown(
      'Tab',
      ref,
      (e) => {
        if (type === BlockType.CODE) {
          document.execCommand('insertHTML', false, '&#009')
          e.preventDefault()
        }
      },
      [type]
    )

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
          ref={mergeRefs(ref, forwardedRef)}
          html={value || ''}
          onChange={_onValueChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
        />
      </div>
    )
  }
)

const getClassName = (type: BlockType) => {
  switch (type) {
    case BlockType.H1:
      return styles.header1
    case BlockType.H2:
      return styles.header2
    case BlockType.H3:
      return styles.header3
    case BlockType.H4:
      return styles.header4
    case BlockType.H5:
      return styles.header5
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

const getFocusedPlaceholder = (type: BlockType, filteringMode: boolean = false) => {
  switch (type) {
    case BlockType.H1:
      return `Heading 1`
    case BlockType.H2:
      return `Heading 2`
    case BlockType.H3:
      return `Heading 3`
    case BlockType.H4:
      return `Heading 4`
    case BlockType.H5:
      return `Heading 5`
    case BlockType.QUOTE:
      return `Empty quote`
    case BlockType.CALLOUT:
      return `Type something...`
    default:
      return filteringMode ? 'Type to filter' : `Type for '/' commands`
  }
}

const getBlurredPlaceholder = (type: BlockType) => {
  switch (type) {
    case BlockType.H1:
      return `Heading 1`
    case BlockType.H2:
      return `Heading 2`
    case BlockType.H3:
      return `Heading 3`
    case BlockType.H4:
      return `Heading 4`
    case BlockType.H5:
      return `Heading 5`
    case BlockType.QUOTE:
      return `Empty quote`
    case BlockType.CALLOUT:
      return `Type something...`
    default:
      return ''
  }
}

interface IProps {
  tabIndex?: number
  type?: BlockType
  value?: string
  filteringMode?: boolean
  disabled?: boolean

  onNew?: () => void
  onUpdate?: (arg0: string) => void
  onDelete?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onSelect?: (e: SyntheticEvent<HTMLDivElement>) => void
  onFocusOutStart?: () => void
  onFocusOutEnd?: () => void
}

export default memo(Text)
