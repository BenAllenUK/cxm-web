import { useEffect, useRef, useState, memo, useCallback } from 'react'
import Text from 'components/editor/blocks/Text'
import { BlockType } from 'components/types'

const ControlledText = (props: IProps) => {
  const {
    focus,
    initialValue,
    onUpdate: onParentUpdate,
    onBlur: onParentBlur,
    ...otherProps
  } = props
  const [payload, setPayload] = useState<string>(props.initialValue || '')
  const onValueChange = (_value: string) => {
    setPayload(_value)
  }

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focus && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [focus])

  const onBlur = useCallback(() => {
    // onParentBlur()
    onParentUpdate(payload)
  }, [])

  return (
    <>
      <Text
        {...otherProps}
        initialValue={initialValue}
        innerRef={inputRef}
        onBlur={onBlur}
        onUpdate={onValueChange}
      />
    </>
  )
}

export default memo(ControlledText)

interface IProps {
  type: BlockType
  initialValue?: string
  focus?: boolean
  tabIndex?: number
  filteringMode?: boolean
  disabled?: boolean

  onNew: () => void
  onUpdate: (arg0: string) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}
