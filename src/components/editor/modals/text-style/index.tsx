import { insertSpanWithStyle } from 'components/editor/utils/html'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import TextStyleUncontrolled, { backgroundColorOptions, textColorOptions } from './TextStyleUncontrolled'

interface Context {
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useTextStyleModal = () => useContext(Context)

const Provider = ({ children, rootRef }: { children: ReactNode; rootRef: RefObject<HTMLDivElement> }) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (position: { x: number; y: number }) => {
    if (!position || !rootRef.current) {
      return
    }

    const bodyTop = rootRef ? rootRef.current.getBoundingClientRect().top : 0
    const bodyLeft = rootRef ? rootRef.current.getBoundingClientRect().left : 0

    setState({
      enabled: true,
      position: { x: position.x - bodyLeft, y: position.y - bodyTop },
    })
  }

  const hideControls = useCallback(() => {
    setState(initialState)
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = (props: IProps) => {
  const { enabled, position, hideControls } = useTextStyleModal()

  const _onClick = (id: number) => {
    const [textColorOption] = textColorOptions.filter((item) => item.id === id)
    const [backgroundColorOption] = backgroundColorOptions.filter((item) => item.id === id)

    if (textColorOption) {
      insertSpanWithStyle({ color: textColorOption.color })
    } else if (backgroundColorOption) {
      insertSpanWithStyle({ backgroundColor: backgroundColorOption.color })
    } else {
      console.error(`Text style not found: ${id}`)
    }
  }

  return (
    <>
      {enabled && position && (
        <TextStyleUncontrolled
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const TextStyle = { Provider, Component }

export default TextStyle

interface IProps {}