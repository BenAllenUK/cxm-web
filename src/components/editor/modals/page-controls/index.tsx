import OptionControls, { OptionType, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faStar, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLock, faLevelUpAlt, faDownload, faUndo } from '@fortawesome/free-solid-svg-icons'
import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import styles from './PageControls.module.scss'
import Footer from './Footer'

const sections: IOptionSections[] = [
  {
    items: [
      { id: 1, type: OptionType.Switch, title: 'Small text', state: false },
      { id: 2, type: OptionType.Switch, title: 'Full width', state: false },
    ],
    showLine: true,
  },
  {
    items: [
      {
        id: 4,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLock} />,
        type: OptionType.Button,
        title: 'Lock page',
      },
    ],
    showLine: true,
  },
  {
    items: [
      {
        id: 5,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faStar} />,
        type: OptionType.Button,
        title: 'Add to favorites',
      },
      {
        id: 6,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
        type: OptionType.Button,
        title: 'Copy link',
        hint: '⌘ + L',
      },
    ],
    showLine: true,
  },
  {
    items: [
      {
        id: 7,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faUndo} />,
        type: OptionType.Button,
        title: 'Undo',
        hint: '⌘ + Z',
      },
      // { id: 8, type: OptionType.Button, title: 'Page history' },
      {
        id: 10,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
        type: OptionType.Button,
        title: 'Delete',
      },
    ],
    showLine: true,
  },
  {
    items: [
      { id: 11, type: OptionType.Button, title: 'Import' },
      {
        id: 12,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faDownload} />,
        type: OptionType.Button,
        title: 'Export',
        subtitle: 'PDF, HTML, Markdown',
      },
    ],
    showLine: true,
  },
  {
    items: [
      {
        id: 13,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
        type: OptionType.Button,
        title: 'Move to',
        subtitle: '⌘ + Shift + P',
      },
    ],
    showLine: true,
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
    },
    [onClick]
  )

  return (
    <Context.Provider value={{ ...state, showControls, hideControls }}>
      {state.enabled && state.position && (
        <OptionControls
          className={styles.container}
          sections={sections}
          position={state.position}
          onClick={_onClick}
          onDismiss={hideControls}
          footer={<Footer wordCount={300} lastEditedName={'Ben Allen'} lastEditedAt={new Date().toISOString()} />}
        />
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
