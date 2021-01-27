import { memo, RefObject, useCallback, useEffect } from 'react'

import TextInput, { TextInputEvent } from 'components/common/TextInput'
import { BlockData, BlockDataText, BlockType, Block } from '../../types'

import { BlockTypeProperties } from '.'
import styles from './Text.module.scss'
import { useKeyDown } from 'utils/hooks'

const Text = ({ value, type, filteringMode, tabIndex, innerRef, onFocus, onBlur, onNew, onUpdate, onDelete }: IProps) => {
  const _onValueChange = useCallback((event: TextInputEvent) => {
    const value = event.target.value.replace('&nbsp;', ' ')
    onUpdate(value)
  }, [])

  const className = getClassName(type)
  const blurredPlaceholder = getBlurredPlaceholder(type)
  const focusedPlaceholder = getFocusedPlaceholder(type, filteringMode)

  useKeyDown('Backspace', innerRef, (e) => {
    if (!!value && !e.shiftKey) {
      e.preventDefault()
      onDelete()
    }
  })

  useKeyDown(
    'Enter',
    innerRef,
    useCallback(
      (e) => {
        if (!filteringMode && type !== BlockType.CODE && !e.shiftKey) {
          e.preventDefault()
          onNew()
        }
      },
      [filteringMode, type]
    )
  )

  useKeyDown(
    'Tab',
    innerRef,
    useCallback(
      (e) => {
        if (type === BlockType.CODE) {
          document.execCommand('insertHTML', false, '&#009')
          e.preventDefault()
        }
      },
      [type]
    )
  )

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
        html={value || ''}
        onChange={_onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

const getClassName = (type: BlockType) => {
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

const getFocusedPlaceholder = (type: BlockType, filteringMode: boolean = false) => {
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

const getBlurredPlaceholder = (type: BlockType) => {
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
interface IProps {
  innerRef: RefObject<HTMLDivElement>
  tabIndex?: number
  type: BlockType
  value?: string
  filteringMode?: boolean
  disabled?: boolean

  onNew: () => void
  onUpdate: (arg0: string) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}

export default memo(Text)
