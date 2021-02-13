import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import BlockControlUncontrolled from './BlockControlUncontrolled'

interface Context {
  index: number
  filterText: string | null

  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (index: number, position: { x: number; y: number }) => void
  hideControls: () => void
  setFilterText: (value: string) => void
}

const initialState = {
  index: -1,
  filterText: null,
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
  setFilterText: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useBlockControlModal = () => useContext(Context)

const Provider = ({ children, rootRef }: { children: ReactNode; rootRef: RefObject<HTMLDivElement> }) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (index: number, position: { x: number; y: number }) => {
    if (!position || !rootRef.current) {
      return
    }

    const bodyTop = rootRef ? rootRef.current.getBoundingClientRect().top : 0
    const bodyLeft = rootRef ? rootRef.current.getBoundingClientRect().left : 0

    setState({
      enabled: true,
      index: index,
      filterText: null,
      position: { x: position.x - bodyLeft, y: position.y - bodyTop },
    })
  }

  const setFilterText = (filterText: string) => {
    setState((state) => ({ ...state, filterText }))
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls, setFilterText }}>{children}</Context.Provider>
}

const Component = ({ onBlockItemClick, ...props }: IProps) => {
  const { index, filterText, enabled, position, hideControls } = useBlockControlModal()

  const _onClick = (key: number) => {
    onBlockItemClick(index, key)
  }

  return (
    <>
      {enabled && position && (
        <BlockControlUncontrolled
          filterText={filterText}
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const BlockControl = { Provider, Component }

export default BlockControl

interface IProps {
  onBlockItemClick: (index: number, key: number) => void
}
