import { createContext, ReactNode, useContext, useState } from 'react'

interface State {
  id: number
  filterText: string | null
}

interface ContextActions extends State {
  setBlockId: (id: number) => void
  setFilterText: (value: string) => void
}

const initialState = {
  id: -1,
  filterText: null,
  setBlockId: () => {},
  setFilterText: () => {},
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

  const setFilterText = (filterText: string) => {
    setState((state) => ({ ...state, filterText }))
  }

  return <Context.Provider value={{ ...state, setFilterText, setBlockId }}>{children}</Context.Provider>
}

export default {
  Provider,
}

interface IProps {
  children: ReactNode
}
