import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import RenameControlsModal from './RenameControlsModal'

interface Context {
  sectionId: number | null
  itemId: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (sectionId: number, itemId: number, position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  sectionId: null,
  itemId: null,
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useRenameControlModals = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (sectionId: number, itemId: number, position: { x: number; y: number }) => {
    setState({
      enabled: true,
      sectionId,
      itemId,
      position,
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = ({ value, onTextChange, onSubmit }: IComponentProps) => {
  const { enabled, position, sectionId, itemId, hideControls } = useRenameControlModals()

  const _onTextChange = (value: string) => {
    if (sectionId === null || itemId === null) {
      console.error(`Section ID and Item ID cannot be null. sectionId: ${sectionId} itemId: ${itemId}`)
      return
    }

    onTextChange(sectionId, itemId, value)
  }

  const _onSubmit = () => {
    if (sectionId === null || itemId === null) {
      console.error(`Section ID and Item ID cannot be null. sectionId: ${sectionId} itemId: ${itemId}`)
      return
    }

    onSubmit(sectionId, itemId)
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
  onTextChange: (sectionId: number, itemId: number, value: string) => void
  onSubmit: (sectionId: number, itemId: number) => void
}

interface IProps {
  children: ReactNode
}
