import OptionControls, { OptionType, IOptionElements, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import { createContext, ReactNode, RefObject, useCallback, useContext, useRef, useState } from 'react'

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
  sectionId: number | null
  itemId: number | null
  enabled: boolean
  position: { x: number; y: number } | null
}

interface ContextActions extends Context {
  showControls: (sectionId: number, itemId: number, position: { x: number; y: number }) => void
  hideControls: () => void
}

const initialState = {
  itemId: null,
  sectionId: null,
  enabled: false,
  position: null,
  showControls: () => {},
  hideControls: () => {},
}

const Context = createContext<ContextActions>({ ...initialState })

export const usePageControlModals = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<Context>(initialState)

  const showControls = (sectionId: number, itemId: number, position: { x: number; y: number }) => {
    setState({
      enabled: true,
      sectionId,
      itemId,
      position,
    })
  }

  const hideControls = useCallback(() => {
    setState({ enabled: false, sectionId: null, itemId: null, position: null })
  }, [])

  return <Context.Provider value={{ ...state, showControls, hideControls }}>{children}</Context.Provider>
}

const Component = ({ onClick }: IComponentProps) => {
  const { sectionId, itemId, enabled, position, hideControls } = usePageControlModals()
  const _onClick = (id: number) => {
    if (sectionId === null || itemId === null) {
      console.error(`Section ID and Item ID cannot be null. sectionId: ${sectionId} itemId: ${itemId}`)
      return
    }

    onClick(sectionId, itemId, id)
    hideControls()
  }

  return (
    <>
      {enabled && position && (
        <OptionControls sections={sections} position={position} onClick={_onClick} onDismiss={hideControls} />
      )}
    </>
  )
}

export default {
  Component,
  Provider,
}

interface IComponentProps {
  onClick: (sectionId: number, itemId: number, optionId: number) => void
}

interface IProps {
  children: ReactNode
}