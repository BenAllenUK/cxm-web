import { useRef, useState } from 'react'
import List from './List'
import { BlockDataCheckBullet, BlockDataListBullet, BlockDataNumberBullet, BlockType } from './types'

const ControlledList = (props: IProps) => {
  const [focusIndex, setFocusIndex] = useState(-1)

  const [items, setItems] = useState<{ value: string; selected?: boolean }[]>(
    props.initialPayload?.items || [{ value: 'Start...' }]
  )

  const _onTextChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], value }
    props.onUpdate(newItems)
    setItems(newItems)

    props.onTextChange(value)
  }

  const _onNew = (index: number) => {
    setItems((oldItems) => {
      return [...oldItems.slice(0, index + 1), { value: '' }, ...oldItems.slice(index + 1)]
    })
    setFocusIndex(index + 1)
  }

  const _onSelectedToggle = (index: number) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], selected: !newItems[index].selected }
    props.onUpdate(newItems)
    setItems(newItems)
  }

  const _onDelete = (index: number) => {
    setItems((oldItems) => {
      return [...oldItems.filter((_, i) => i !== index)]
    })
    setFocusIndex(index - 1)
  }

  const _onFocus = (index: number) => {
    if (index === focusIndex) {
      return
    }
    setFocusIndex(index)
  }

  const _onBlur = (index: number) => {
    if (index === focusIndex) {
      setFocusIndex(-1)
    }
  }

  return (
    <List
      {...props}
      focusIndex={focusIndex}
      items={items}
      onSelectedToggle={_onSelectedToggle}
      onTextChange={_onTextChange}
      onNew={_onNew}
      onDelete={_onDelete}
      onBlur={_onBlur}
      onFocus={_onFocus}
    />
  )
}

export default ControlledList

interface IProps {
  type: BlockType
  initialPayload?: BlockDataListBullet | BlockDataNumberBullet | BlockDataCheckBullet
  focus?: boolean
  tabIndex?: number
  filteringMode?: boolean
  disabled?: boolean

  onTextChange: (value: string) => void
  onNew: () => void
  onUpdate: (value: { value: string; selected?: boolean }[]) => void
  onDelete: () => void
  onFocus: () => void
  onBlur: () => void
}
