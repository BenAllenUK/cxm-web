import createPositionModal from 'components/common/modals/position'
import { BlockType } from 'components/editor/blocks/types'
import BlockControlUncontrolled from './BlockControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useBlockControlModal = useModal

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
