import { BlockType } from 'components/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode } from 'react'

import PageControls from '../page-controls'

interface PageContext {
  id: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface Context {
  page: PageContext
}

interface ContextActions extends Context {
  togglePageControls: (enabled: boolean, id?: number | null, position?: { x: number; y: number }) => void
}

const initialPageState = {
  id: null,
  enabled: false,
  position: null,
}

const initialState = {
  page: initialPageState,
  togglePageControls: () => {},
}

const ModalContext = createContext<ContextActions>(initialState)

export const useModals = () => useContext(ModalContext)

const Modals = ({ children, onBlockItemClick }: IProps) => {
  const [pageState, setTextState] = useState<PageContext>(initialPageState)

  const togglePageControls = (enabled: boolean, id: number | null = null, position: { x: number; y: number } | null = null) => {
    setTextState({
      enabled,
      id,
      position,
    })
  }

  const onDismissTextControls = useCallback(() => {
    togglePageControls(false)
  }, [])

  return (
    <ModalContext.Provider value={{ page: pageState, togglePageControls }}>
      {/* {pageState.enabled && pageState.position && ( */}
      <PageControls onClick={() => {}} position={pageState.position || { x: 10, y: 10 }} onDismiss={onDismissTextControls} />
      {/* )} */}
      {children}
    </ModalContext.Provider>
  )
}

export default memo(Modals)

interface IProps {
  children: ReactNode
}
