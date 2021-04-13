import createPositionModal from 'components/common/modals/position'
import { Block, BlockType } from 'components/editor/blocks/types'
import ConfigControlUncontrolled from './ConfigControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useConfigControlModal = useModal

const Component = ({ ...props }: IProps) => {
  const { enabled, position, hideControls } = useConfigControlModal()

  return (
    <>
      {enabled && position && (
        <ConfigControlUncontrolled style={{ left: 50, top: '20%' }} onDismiss={hideControls} onClick={() => null} {...props} />
      )}
    </>
  )
}

const ConfigControl = { Provider, Component }

export default ConfigControl

interface IProps {}
