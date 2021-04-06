import { SyntheticEvent } from 'react'
import Divider from 'components/editor/blocks/divider/Divider'
import Image from 'components/editor/blocks/image/Image'
import File from 'components/editor/blocks/file/File'
import Video from 'components/editor/blocks/video/Video'
import {
  BlockData,
  BlockDataMedia,
  BlockDataListBullet,
  BlockDataText,
  BlockType,
  BlockDataMediaUpload,
  BlockDataButton,
  BlockDataTextInput,
} from 'components/editor/blocks/types'
import ControlledList from '../blocks/list/ControlledList'
import ControlledText from '../blocks/text/ControlledText'
import ButtonBlock from '../blocks/button/ButtonBlock'
import TextInputBlock from '../blocks/textInput/TextInputBlock'

const Item = ({
  blockControlOpen,
  type,
  payload,
  index,
  focus,
  onTextChange,
  onNew,
  onUpdate,
  onMediaUpdate,
  onDelete,
  onFocus,
  onBlur,
  onSelect,
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

  const _onMediaUpdate = (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => {
    onMediaUpdate(index, value, { file: pendingUploadFile, blockType: type, id: id }, blockType, createNew)
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

  switch (type) {
    case BlockType.TEXT:
    case BlockType.H1:
    case BlockType.H2:
    case BlockType.H3:
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
        />
      )
    }
    case BlockType.IMAGE: {
      const content: BlockDataMedia = payload as BlockDataMedia
      return <Image onDeleteBlock={_onDelete} content={content} onUpdate={_onUpdate} onMediaUpdate={_onMediaUpdate} id={id} />
    }
    case BlockType.FILE: {
      const content: BlockDataMedia = payload as BlockDataMedia
      return <File onDeleteBlock={_onDelete} content={content} onUpdate={_onUpdate} onMediaUpdate={_onMediaUpdate} id={id} />
    }
    case BlockType.VIDEO: {
      const content: BlockDataMedia = payload as BlockDataMedia
      return <Video onDeleteBlock={_onDelete} content={content} onUpdate={_onUpdate} onMediaUpdate={_onMediaUpdate} id={id} />
    }
    case BlockType.BUTTON: {
      const content: BlockDataButton = payload as BlockDataButton
      return <ButtonBlock onDeleteBlock={_onDelete} content={content} onUpdate={_onUpdate} />
    }
    case BlockType.TEXT_INPUT: {
      const content: BlockDataTextInput = payload as BlockDataTextInput
      return <TextInputBlock onDeleteBlock={_onDelete} content={content} onUpdate={_onUpdate} />
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
  onMediaUpdate: (
    index: number,
    payload: BlockDataMedia,
    pendingUploadFile: BlockDataMediaUpload,
    blockType: BlockType,
    createNew?: boolean
  ) => void
  onDelete: (index: number) => void
  onFocus: (index: number) => void
  onBlur: (index: number) => void
  onSelect: (index: number, e: SyntheticEvent<HTMLDivElement>) => void
}
