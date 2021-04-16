import createPositionModal from 'components/common/modals/position'
import FileControlsUncontrolled from './FileControlsUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useFileControlModal = useModal

const Component = ({ ...props }: IProps) => {
  const { enabled, position } = useFileControlModal()

  return <>{enabled && position && <FileControlsUncontrolled style={{ left: position.x, top: position.y }} {...props} />}</>
}

const FileControls = { Provider, Component }

export default FileControls

interface IProps {
  onWriteNewCaption?: () => void
  onAddLink?: () => void
  onDeleteBlock: () => void
}
