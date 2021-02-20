import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import { useLinkModal } from '../link'
import { useTextStyleModal } from '../text-style'
import TextControlUncontrolled from './TextControlUncontrolled'

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

export const useTextControlModal = () => useContext(Context)

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
  const { enabled, position, hideControls } = useTextControlModal()
  const { showControls: showTextStyleModal } = useTextStyleModal()
  const { showControls: showLinkModal } = useLinkModal()

  const _onShowTextStyleModal = () => {
    if (!position) {
      return
    }

    // const s = window.getSelection()
    // const oRange = s.getRangeAt(0) //get the text range
    // console.log(oRange)
    // console.log(oRange.getClientRects())
    // const oRect = oRange.getBoundingClientRect()

    // console.log(oRect)

    showTextStyleModal(position)
  }

  const _onShowLinkModal = () => {
    if (!position) {
      return
    }

    showLinkModal(position)
  }

  const _onShowConversionModal = () => {}

  const _onShowCommentModal = () => {}

  const _onShowMoreModal = () => {}

  return (
    <>
      {enabled && position && (
        <TextControlUncontrolled
          onDismiss={hideControls}
          style={{
            left: position.x,
            top: position.y,
          }}
          onShowTextStyleModal={_onShowTextStyleModal}
          onShowLinkModal={_onShowLinkModal}
          onShowConversionModal={_onShowConversionModal}
          onShowCommentModal={_onShowCommentModal}
          onShowMoreModal={_onShowMoreModal}
          {...props}
        />
      )}
    </>
  )
}

const TextControl = { Provider, Component }

export default TextControl

interface IProps {}
