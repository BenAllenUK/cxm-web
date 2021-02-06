import { createContext, memo, ReactNode, RefObject, useContext, useRef, useState } from 'react'

import StyleButton, { StyleTypes } from './StyleButton'
import LinkButton from './LinkButton'

import styles from './TextControls.module.scss'
import { useOnClickOutside } from 'utils/hooks'

interface State {
  enabled: boolean
  position: { x: number; y: number } | null
}

interface Context extends State {
  showControls: (position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  enabled: false,
  position: null,
}
const initialContextState = {
  ...initialState,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<Context>(initialContextState)

export const useModals = () => useContext(Context)

const TextControls = ({ rootRef, children }: IProps) => {
  const [state, setState] = useState<State>(initialContextState)
  const ref = useRef<HTMLDivElement>(null)

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

  const hideControls = () => {
    setState({
      enabled: false,
      position: null,
    })
  }

  useOnClickOutside(ref, () => {
    hideControls()
  })

  return (
    <Context.Provider value={{ ...state, showControls, hideControls }}>
      {state.enabled && state.position && (
        <div
          ref={ref}
          className={styles.container}
          style={{
            left: state.position.x,
            top: state.position.y,
          }}
        >
          <StyleButton type={StyleTypes.BOLD} />
          <StyleButton type={StyleTypes.ITALIC} />
          <StyleButton type={StyleTypes.UNDERLINE} />
          <StyleButton type={StyleTypes.STRIKE_THROUGH} />
          <LinkButton />
          {/* <StyleButton type="formatBlock" arg="h2" name="heading2" />
        <StyleButton type="formatBlock" arg="h3" name="heading3" /> */}
          {/* <StyleButton
          type="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        /> */}
        </div>
      )}
      {children}
    </Context.Provider>
  )
}

interface IProps {
  rootRef: RefObject<HTMLDivElement>
  children: ReactNode
}

export default memo(TextControls)
