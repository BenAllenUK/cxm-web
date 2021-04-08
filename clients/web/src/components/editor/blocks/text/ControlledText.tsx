import { useEffect, useRef, useState, memo, useCallback, SyntheticEvent, forwardRef } from 'react'
import Text from 'components/editor/blocks/text/Text'
import { BlockType } from 'components/editor/blocks/types'
import styles from './Text.module.scss'
import mergeRefs from 'utils/refs/mergeRefs'

const ControlledText = forwardRef<HTMLDivElement, IProps>(
  (
    { focus, initialValue, debugPosition, onTextChange, onUpdate: onParentUpdate, onBlur: onParentBlur, ...otherProps },
    forwardedRef
  ) => {
    const [value, setValue] = useState<string>(initialValue || '')

    const onValueChange = useCallback(
      (_value: string) => {
        onTextChange && onTextChange(_value)
        setValue(_value)
        onParentUpdate && onParentUpdate(_value)
      },
      [onTextChange, onParentUpdate]
    )

    const inputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (focus && inputRef?.current) {
        inputRef.current.focus()
      }
    }, [focus])

    const onBlur = useCallback(() => {
      onParentBlur && onParentBlur()
      // TODO: Optimise (use dirty flag on block item)
      // if (JSON.stringify(initialValue) !== JSON.stringify(value)) {
      //   onParentUpdate(value)
      // }
    }, [onParentBlur])

    return (
      <>
        {/* <div className={styles.debug}>{debugPosition}</div> */}
        <Text
          {...otherProps}
          value={initialValue}
          ref={mergeRefs(inputRef, forwardedRef)}
          onBlur={onBlur}
          onUpdate={onValueChange}
        />
      </>
    )
  }
)

export default ControlledText

interface IProps {
  type?: BlockType
  initialValue?: string
  focus?: boolean
  tabIndex?: number
  filteringMode?: boolean
  disabled?: boolean
  debugPosition?: number

  onTextChange?: (value: string) => void
  onNew?: () => void
  onUpdate?: (value: string) => void
  onDelete?: () => void
  onFocus?: () => void
  onBlur?: () => void
  onSelect?: (e: SyntheticEvent<HTMLDivElement>) => void
  onFocusOutStart?: () => void
  onFocusOutEnd?: () => void
}
