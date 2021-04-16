import { createContext, ReactNode, useContext, useState } from 'react'

interface State {
  id: number
}

interface ContextActions extends State {
  setBlockId: (id: number) => void
}

const initialState = {
  id: -1,
  setBlockId: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useBlockControlsContext = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<State>(initialState)

  const setBlockId = (id: number) => {
    setState({
      ...state,
      id,
    })
  }

  return <Context.Provider value={{ ...state, setBlockId }}>{children}</Context.Provider>
}

interface IProps {
  children: ReactNode
}
export default {
  Provider,
}
