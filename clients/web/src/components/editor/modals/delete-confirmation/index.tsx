import createModal from 'components/common/modals/simple'
import DeleteConfirmationUncontrolled from './DeleteConfirmationUncontrolled'

const { Provider, useModal } = createModal()
export const useDeleteConfirmationModal = useModal

const Component = ({ onAccept }: IProps) => {
  const { enabled, showControls, hideControls } = useDeleteConfirmationModal()

  const _onAccept = () => {}

  const _onDecline = () => {
    hideControls()
  }

  return <>{enabled && <DeleteConfirmationUncontrolled onDecline={_onDecline} onAccept={_onAccept} />}</>
}

const DeleteConfirmation = { Provider, Component }

export default DeleteConfirmation

interface IProps {
  onAccept: () => void
}
