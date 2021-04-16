import createPositionModal from 'components/common/modals/position'
import { useCallback } from 'react'
import FileMoreControlUncontrolled from './FileMoreControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useFileControlModal = useModal

const Component = ({ onClick, ...props }: IProps) => {
  const { enabled, position, hideControls } = useFileControlModal()

  const _onClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <>
      {enabled && position && (
        <FileMoreControlUncontrolled
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const FileMoreControls = { Provider, Component }

export default FileMoreControls

interface IProps {
  onClick: () => void
}
