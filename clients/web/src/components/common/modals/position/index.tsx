import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'

interface State {
  enabled: boolean
  position: { x: number; y: number } | null
  payload: object
}

interface ContextActions extends State {
  showControls: (position: { x: number; y: number }, payload?: object) => void
  hideControls: () => void
  rootRef: RefObject<HTMLDivElement> | undefined
  payload: object
}

const initialState = {
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
  rootRef: undefined,
  payload: {},
}

const createPositionModal = () => {
  const Context = createContext<ContextActions>(initialState)

  return {
    useModal: () => useContext(Context),
    Provider: ({ children, rootRef }: { children: ReactNode; rootRef?: RefObject<HTMLDivElement> }) => {
      const [state, setState] = useState<State>(initialState)

      const showControls = (position: { x: number; y: number }, payload: object = {}) => {
        const x = rootRef?.current ? position.x - rootRef.current.getBoundingClientRect().left : position.x
        const y = rootRef?.current ? position.y - rootRef.current.getBoundingClientRect().top : position.y

        setState({
          enabled: true,
          position: { x, y },
          payload,
        })
      }

      const hideControls = useCallback(() => {
        setState(initialState)
      }, [])

      return <Context.Provider value={{ ...state, showControls, hideControls, rootRef: rootRef }}>{children}</Context.Provider>
    },
  }
}

export default createPositionModal
