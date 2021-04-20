import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface State {
  enabled: boolean
}

interface ContextActions extends State {
  showControls: () => void
  hideControls: () => void
}

const initialState = {
  enabled: false,
  showControls: () => {},
  hideControls: () => {},
}

const createModal = () => {
  const Context = createContext<ContextActions>(initialState)

  return {
    useModal: () => useContext(Context),
    Provider: ({ children }: { children: ReactNode }) => {
      const [state, setState] = useState<State>(initialState)

      const showControls = () => {
        setState({
          enabled: true,
        })
      }

      const hideControls = useCallback(() => {
        setState(initialState)
      }, [])

      return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
    },
  }
}

export default createModal
