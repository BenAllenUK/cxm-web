import { createContext, ReactNode, RefObject, useCallback, useContext, useRef, useState } from 'react'

interface State {
  enabled: boolean
  payload: object
}

interface ContextActions extends State {
  showControls: (payload?: object) => void
  hideControls: () => void
  ref: RefObject<HTMLDivElement> | null
  payload: object
  position: { x: number; y: number }
}

const initialState = {
  enabled: false,
  showControls: () => {},
  hideControls: () => {},
  payload: {},
}

const createAnchorModal = () => {
  const ref = useRef<HTMLDivElement>(null)
  const Context = createContext<ContextActions>({ ...initialState, ref, position: { x: 0, y: 0 } })

  return {
    useModal: () => useContext(Context),
    Provider: ({ children }: { children: ReactNode }) => {
      const [state, setState] = useState<State>(initialState)

      const showControls = (payload: object = {}) => {
        setState({
          enabled: true,
          payload,
        })
      }

      const hideControls = useCallback(() => {
        setState(initialState)
      }, [])

      const x = ref.current ? ref.current.getBoundingClientRect().left : 0
      const y = ref.current ? ref.current.getBoundingClientRect().top : 0

      return (
        <Context.Provider value={{ ...state, showControls, hideControls, ref, position: { x, y } }}>{children}</Context.Provider>
      )
    },
  }
}

export default createAnchorModal
