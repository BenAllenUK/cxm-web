import { ArticleFragment } from 'generated/graphql'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import SearchComponent, { ISearchProps } from './Search'
import styles from './Search.module.scss'

interface Context {
  enabled: boolean
}

interface ContextActions extends Context {
  showControls: () => void
  hideControls: () => void
}

const initialState = {
  enabled: false,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useSearchModal = () => useContext(Context)

const Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = () => {
    setState({
      enabled: true,
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = (props: ISearchProps) => {
  const { enabled, hideControls } = useSearchModal()
  return <>{enabled && <SearchComponent {...props} onDismiss={hideControls} />}</>
}

const Search = { Provider, Component }

export default Search
