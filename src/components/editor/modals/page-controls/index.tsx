import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import PageControlUncontrolled from './PageControlUncontrolled'

interface Context {
  id: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (id: number, position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  id: null,

  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const usePageControlModal = () => useContext(Context)

const Provider = ({ children, rootRef }: { children: ReactNode; rootRef: RefObject<HTMLDivElement> }) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (id: number, position: { x: number; y: number }) => {
    if (!position || !rootRef.current) {
      return
    }

    const bodyTop = rootRef ? rootRef.current.getBoundingClientRect().top : 0
    const bodyLeft = rootRef ? rootRef.current.getBoundingClientRect().left : 0

    setState({
      id,
      enabled: true,
      position: { x: position.x - bodyLeft, y: position.y - bodyTop },
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = ({ onClick, ...props }: IProps) => {
  const { id, enabled, position, hideControls } = usePageControlModal()

  const _onClick = useCallback(() => {
    if (id === null) {
      return
    }

    onClick(id)
  }, [onClick, id])

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
  onClick: (id: number) => void
}
