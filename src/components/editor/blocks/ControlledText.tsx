import { useEffect, useRef, useState, memo, useCallback } from 'react'
import Text from 'components/editor/blocks/Text'
import { BlockType } from 'components/types'

const ControlledText = ({
  focus,
  initialValue,
  onTextChange,
  onUpdate: onParentUpdate,
  onBlur: onParentBlur,
  ...otherProps
}: IProps) => {
  const [value, setValue] = useState<string>(initialValue || '')

  const onValueChange = useCallback((_value: string) => {
    onTextChange(_value)
    setValue(_value)
  }, [])

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (focus && inputRef?.current) {
      inputRef.current.focus()
    }
  }, [focus])

  const onBlur = useCallback(() => {
    // onParentBlur()
    // TODO: Optimise (use dirty flag on block item)
    if (JSON.stringify(initialValue) !== JSON.stringify(value)) {
      onParentUpdate(value)
    }
  }, [initialValue, value])

  return (
    <>
      <Text {...otherProps} value={value} innerRef={inputRef} onBlur={onBlur} onUpdate={onValueChange} />
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

  onTextChange: (value: string) => void
  onNew: () => void
  onUpdate: (value: string) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}
