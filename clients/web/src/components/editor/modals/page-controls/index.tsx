import createPositionModal from 'components/common/modals/position'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import PageControlUncontrolled from './PageControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const usePageControlModal = useModal

const Component = ({ onClick, ...props }: IProps) => {
  const { enabled, position, hideControls } = usePageControlModal()

  const _onClick = useCallback(() => {
    onClick()
  }, [onClick])

  return (
    <>
      {enabled && position && (
        <PageControlUncontrolled
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const PageControl = { Provider, Component }

export default PageControl

interface IProps {
  onClick: () => void
}
