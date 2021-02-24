import createPositionModal from 'components/common/modals/position'
import RenameControlsModal from './RenameControlsModal'

const { Provider, useModal } = createPositionModal()

export const useRenameControlModals = useModal

const Component = ({ value, onTextChange, onSubmit }: IComponentProps) => {
  const { enabled, position, hideControls } = useRenameControlModals()

  const _onTextChange = (value: string) => {
    onTextChange(value)
  }

  const _onSubmit = () => {
    onSubmit()
  }

  return (
    <>
      {enabled && position && (
        <RenameControlsModal
          position={position}
          onDismiss={hideControls}
          onTextChange={_onTextChange}
          onSubmit={_onSubmit}
          value={value}
        />
      )}
    </>
  )
}

export default {
  Component,
  Provider,
}

interface IComponentProps {
  value?: string | null
  onTextChange: (value: string) => void
  onSubmit: () => void
}
