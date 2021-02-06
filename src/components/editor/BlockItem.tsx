import { memo, useCallback } from 'react'

import Divider from 'components/editor/blocks/Divider'
import Image from 'components/editor/blocks/Image'
import { Block, BlockData, BlockDataImage, BlockDataText, BlockType } from 'components/types'
import ControlledText from './blocks/ControlledText'

const BlockItem = ({
  blockControlOpen,
  type,
  payload,
  index,
  focus,
  onTextChange,
  onNew,
  onUpdate,
  onDelete,
  onFocus,
  onBlur,
}: IProps) => {
  const _onNew = () => {
    onNew(index)
  }

  const _onUpdate = (value: string) => {
    onUpdate(index, { value } as BlockDataText) // TODO: change to any type
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
          onUpdate={_onUpdate}
          onDelete={_onDelete}
          onFocus={_onFocus}
          onBlur={_onBlur}
        />
      )
    }
    case BlockType.IMAGE: {
      const content: BlockDataImage = payload as BlockDataImage
      return <Image content={content} />
    }
    case BlockType.DIVIDER:
      return <Divider />
    default:
      return <div />
  }
}

export default BlockItem

interface IProps {
  focus: boolean
  blockControlOpen: boolean
  type: BlockType
  payload: BlockData
  index: number

  onTextChange: (index: number, value: string) => void
  onNew: (index: number) => void
  onUpdate: (index: number, arg0: BlockData) => void // TODO: Change BlockData to BlockPayload
  onDelete: (index: number) => void
  onFocus: (index: number) => void
  onBlur: (index: number) => void
}
