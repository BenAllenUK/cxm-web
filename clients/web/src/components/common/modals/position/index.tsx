import { Context, createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'

interface State {
  articleId: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends State {
  showControls: (position: { x: number; y: number }, articleId?: number | null) => void
  hideControls: () => void
  rootRef: RefObject<HTMLDivElement> | undefined
}

const initialState = {
  enabled: false,
  position: null,
  articleId: null,
  showControls: () => {},
  hideControls: () => {},
  rootRef: undefined,
}

const createPositionModal = () => {
  const Context = createContext<ContextActions>(initialState)

  return {
    useModal: () => useContext(Context),
    Provider: ({ children, rootRef }: { children: ReactNode; rootRef?: RefObject<HTMLDivElement> }) => {
      const [state, setState] = useState<State>(initialState)

      const showControls = (position: { x: number; y: number }, articleId?: number | null) => {
        const x = rootRef?.current ? position.x - rootRef.current.getBoundingClientRect().left : position.x
        const y = rootRef?.current ? position.y - rootRef.current.getBoundingClientRect().top : position.y

        setState({
          ...state,
          enabled: true,
          position: { x, y },
          articleId: articleId || null,
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
