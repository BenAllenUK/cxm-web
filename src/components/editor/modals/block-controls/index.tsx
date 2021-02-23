import createPositionModal from 'components/common/modals/position'
import BlockControlUncontrolled from './BlockControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useBlockControlModal = useModal

const Component = ({ index, filterText, onBlockItemClick, ...props }: IProps) => {
  const { enabled, position, hideControls } = useBlockControlModal()

  const _onClick = (key: number) => {
    onBlockItemClick(index, key)
  }

  return (
    <>
      {enabled && position && (
        <BlockControlUncontrolled
          filterText={filterText}
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const BlockControl = { Provider, Component }

export default BlockControl

interface IProps {
  index: number
  filterText: string | null
  onBlockItemClick: (index: number, key: number) => void
}
