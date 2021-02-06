import OptionControls, { OptionType, IOptionElements, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'

const sections: IOptionSections[] = [
  {
    showLine: true,
    items: [
      {
        id: 1,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
        type: OptionType.Button,
        title: 'Delete',
      },
      {
        id: 2,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faClone} />,
        type: OptionType.Button,
        title: 'Duplicate',
        hint: '⌘ + D',
      },
      {
        id: 3,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
        type: OptionType.Button,
        title: 'Copy Link',
      },
      {
        id: 4,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faEdit} />,
        type: OptionType.Button,
        title: 'Rename',
        hint: '⌘ + Shift + R',
      },
    ],
  },
  {
    showLine: true,
    items: [
      {
        id: 5,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
        type: OptionType.Button,
        title: 'Move to',
        hint: '⌘ + Shift + P',
      },
    ],
  },
]
interface Context {
  id: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (id: number, position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  id: null,
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const usePageControlModals = () => useContext(Context)

const PageControls = ({ children, onClick }: IProps) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (id: number, position: { x: number; y: number }) => {
    setState({
      enabled: true,
      id,
      position,
    })
  }

  const hideControls = useCallback(() => {
    setState({ enabled: false, id: null, position: null })
  }, [])

  const _onClick = useCallback(
    (id: number) => {
      onClick(id)
      hideControls()
    },
    [onClick]
  )

  return (
    <Context.Provider value={{ ...state, showControls, hideControls }}>
      {state.enabled && state.position && (
        <OptionControls sections={sections} position={state.position} onClick={_onClick} onDismiss={hideControls} />
      )}
      {children}
    </Context.Provider>
  )
}

export default PageControls

interface IProps {
  children: ReactNode
  onClick: (id: number) => void
}
