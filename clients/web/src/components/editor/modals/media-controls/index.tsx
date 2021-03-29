import createPositionModal from 'components/common/modals/position'
import { createContext, RefObject, useCallback, useContext, useState } from 'react'
import MediaControlUncontrolled from './MediaControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useMediaControlModal = useModal

const Component = ({ onClick, ...props }: IProps) => {
  const { enabled, position, hideControls } = useMediaControlModal()

  const _onClick = useCallback(() => {
    onClick()
  }, [onClick])
  return (
    <>
      {enabled && position && (
        <MediaControlUncontrolled
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const MediaControl = { Provider, Component }

export default MediaControl

interface IProps {
  onClick: () => void
}
