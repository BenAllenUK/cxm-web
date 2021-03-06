import createPositionModal from 'components/common/modals/position'
import { BlockTypeProperties, BLOCK_CONTAINER_VERTICAL_PADDING } from 'components/editor/blocks'
import { Block, BlockType } from 'components/editor/blocks/types'
import { MutableRefObject } from 'react'
import BlockControlUncontrolled from './BlockControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useBlockControlModal = useModal

export function calculateBlockControlsPosition(ref: HTMLDivElement, block: Block) {
  const { top: blockTop, left: blockLeft } = ref.getBoundingClientRect()

  const initialHeight = BlockTypeProperties[block.type].initialHeight
  return {
    x: blockLeft,
    y: blockTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
  }
}

const Component = ({ filterText, onBlockItemClick, ...props }: IProps) => {
  const { enabled, position, hideControls } = useBlockControlModal()

  return (
    <>
      {enabled && position && (
        <BlockControlUncontrolled
          filterText={filterText}
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={onBlockItemClick}
          {...props}
        />
      )}
    </>
  )
}

const BlockControl = { Provider, Component }

export default BlockControl

interface IProps {
  id: number
  filterText: string | null
  onBlockItemClick: (key: BlockType) => void
}
