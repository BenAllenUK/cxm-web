import { createContext, ReactNode, RefObject, useCallback, useContext, useRef, useState } from 'react'

interface State {
  sectionId: number
  articleId: number
}

interface ContextActions extends State {
  setTarget: (sectionId: number, articleId: number) => void
}

const initialState = {
  sectionId: -1,
  articleId: -1,
  setTarget: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useSidebarPageControlsContext = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<State>(initialState)
  const setTarget = (sectionId: number, articleId: number) => {
    console.log(sectionId, articleId)
    setState({
      sectionId,
      articleId,
    })
  }

  return <Context.Provider value={{ ...state, setTarget }}>{children}</Context.Provider>
}

export default {
  Provider,
}

interface IProps {
  children: ReactNode
}
