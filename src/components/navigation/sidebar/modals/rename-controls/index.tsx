import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import RenameControlsModal from './RenameControlsModal'

interface Context {
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useRenameControlModals = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (position: { x: number; y: number }) => {
    setState({
      enabled: true,
      position,
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

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

interface IProps {
  children: ReactNode
}
