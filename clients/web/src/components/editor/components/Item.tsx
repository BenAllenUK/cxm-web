import { SyntheticEvent } from 'react'
import Divider from 'components/editor/blocks/divider/Divider'
import Image from 'components/editor/blocks/image/Image'
import { BlockData, BlockDataImage, BlockDataListBullet, BlockDataText, BlockType } from 'components/editor/blocks/types'
import ControlledList from '../blocks/list/ControlledList'
import ControlledText from '../blocks/text/ControlledText'

const Item = ({
  blockControlOpen,
  type,
  payload,
  index,
  focus,
  onTextChange,
  onNew,
  onUpdate,
  onImageUpdate,
  onDelete,
  onFocus,
  onBlur,
  onSelect,
  onFocusOutStart,
  onFocusOutEnd,
  id,
}: IProps & IItemHandlerProps) => {
  const _onNew = () => {
    onNew(index)
  }

  // Remove to payload update
  const _onTextUpdate = (value: string) => {
    onUpdate(index, { value } as BlockDataText) // TODO: change to any type
  }

  const _onListUpdate = (value: { value: string; selected?: boolean }[]) => {
    onUpdate(index, value)
  }

  const _onUpdate = (value: BlockData, type?: BlockType) => {
    onUpdate(index, value, type)
  }

  const _onImageUpdate = (value: BlockData, type?: BlockType, pendingUploadFile?: File, createNew?: boolean) => {
    onImageUpdate(index, value, type, pendingUploadFile, createNew)
  }

  const _onDelete = () => {
    onDelete(index)
  }

  const _onFocus = () => {
    onFocus(index)
  }

  const _onBlur = () => {
    onBlur(index)
  }

  const _onTextChange = (value: string) => {
    onTextChange(index, value)
  }

  const _onSelect = (e: SyntheticEvent<HTMLDivElement>) => {
    onSelect(index, e)
  }

  const _onFocusOutStart = () => {
    onFocusOutStart(index)
  }

  const _onFocusOutEnd = () => {
    onFocusOutEnd(index)
  }

  switch (type) {
    case BlockType.TEXT:
    case BlockType.H1:
    case BlockType.H2:
    case BlockType.H3:
    case BlockType.H4:
    case BlockType.H5:
    case BlockType.CALLOUT:
    case BlockType.CODE:
    case BlockType.QUOTE: {
      const initialPayload = payload as BlockDataText
      return (
        <ControlledText
          debugPosition={index}
          focus={focus}
          tabIndex={index + 1}
          initialValue={initialPayload.value}
          type={type}
          filteringMode={blockControlOpen}
          onTextChange={_onTextChange}
          onNew={_onNew}
          onUpdate={_onTextUpdate}
          onDelete={_onDelete}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onSelect={_onSelect}
          onFocusOutStart={_onFocusOutStart}
          onFocusOutEnd={_onFocusOutEnd}
        />
      )
    }
    case BlockType.IMAGE: {
      const content: BlockDataImage = payload as BlockDataImage
      return <Image content={content} onUpdate={_onUpdate} onImageUpdate={_onImageUpdate} id={id} />
    }
    case BlockType.DIVIDER:
      return <Divider />
    case BlockType.LIST_BULLET:
    case BlockType.LIST_CHECK:
    case BlockType.LIST_NUMBER:
      const initialPayload = payload as BlockDataListBullet

      return (
        <ControlledList
          focus={focus}
          tabIndex={index + 1}
          initialPayload={initialPayload}
          type={type}
          filteringMode={blockControlOpen}
          onTextChange={_onTextChange}
          onNew={_onNew}
          onUpdate={_onListUpdate}
          onDelete={_onDelete}
          onFocus={_onFocus}
          onBlur={_onBlur}
        />
      )
    default:
      return <div />
  }
}

export default Item

interface IProps {
  focus: boolean
  blockControlOpen: boolean
  type: BlockType
  payload: BlockData
  index: number
  id: number
}

export interface IItemHandlerProps {
  onTextChange: (index: number, value: string) => void
  onNew: (index: number) => void
  onUpdate: (index: number, payload: BlockData, type?: BlockType) => void
  onImageUpdate: (index: number, payload: BlockData, type?: BlockType, pendingUploadFile?: File, createNew?: boolean) => void
  onDelete: (index: number) => void
  onFocus: (index: number) => void
  onBlur: (index: number) => void
  onSelect: (index: number, e: SyntheticEvent<HTMLDivElement>) => void
  onFocusOutStart: (index: number) => void
  onFocusOutEnd: (index: number) => void
}
