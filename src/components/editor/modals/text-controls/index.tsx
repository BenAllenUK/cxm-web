import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import TextControlUncontrolled from './TextControlUncontrolled'

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

export const useTextControlModal = () => useContext(Context)

const Provider = ({ children, rootRef }: { children: ReactNode; rootRef: RefObject<HTMLDivElement> }) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (position: { x: number; y: number }) => {
    if (!position || !rootRef.current) {
      return
    }

    const bodyTop = rootRef ? rootRef.current.getBoundingClientRect().top : 0
    const bodyLeft = rootRef ? rootRef.current.getBoundingClientRect().left : 0

    setState({
      enabled: true,
      position: { x: position.x - bodyLeft, y: position.y - bodyTop },
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = (props: IProps) => {
  const { enabled, position, hideControls } = useTextControlModal()
  return (
    <>
      {enabled && position && (
        <TextControlUncontrolled
          onDismiss={hideControls}
          style={{
            left: position.x,
            top: position.y,
          }}
          {...props}
        />
      )}
    </>
  )
}

const TextControl = { Provider, Component }

export default TextControl

interface IProps {}
