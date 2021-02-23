import { createContext, ReactNode, useContext, useState } from 'react'

interface State {
  index: number
  filterText: string | null
}

interface ContextActions extends State {
  setIndex: (index: number) => void
  setFilterText: (value: string) => void
}

const initialState = {
  index: -1,
  filterText: null,
  setIndex: () => {},
  setFilterText: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useBlockControlsContext = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<State>(initialState)

  const setIndex = (index: number) => {
    setState({
      ...state,
      index,
    })
  }

  const setFilterText = (filterText: string) => {
    setState((state) => ({ ...state, filterText }))
  }

  return <Context.Provider value={{ ...state, setFilterText, setIndex }}>{children}</Context.Provider>
}

export default {
  Provider,
}

interface IProps {
  children: ReactNode
}
