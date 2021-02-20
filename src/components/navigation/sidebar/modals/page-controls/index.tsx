import OptionControls, { OptionType, IOptionElements, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import { createContext, ReactNode, RefObject, useCallback, useContext, useRef, useState } from 'react'

export enum PageControlOptions {
  Delete = 0,
  Duplicate,
  Copy,
  Rename,
}

const sections: IOptionSections[] = [
  {
    id: 0,
    showLine: true,
    items: [
      {
        id: PageControlOptions.Delete,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
        type: OptionType.Button,
        title: 'Delete',
      },
      {
        id: PageControlOptions.Duplicate,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faClone} />,
        type: OptionType.Button,
        title: 'Duplicate',
        hint: '⌘ + D',
      },
      {
        id: PageControlOptions.Copy,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
        type: OptionType.Button,
        title: 'Copy Link',
      },
      {
        id: PageControlOptions.Rename,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faEdit} />,
        type: OptionType.Button,
        title: 'Rename',
        hint: '⌘ + Shift + R',
      },
    ],
  },
  {
    id: 1,
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
    setState(initialState)
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
        <OptionControls
          sections={sections}
          style={{ left: position.x, top: position.y }}
          onItemClick={_onClick}
          onDismiss={hideControls}
        />
      )}
    </>
  )
}

export default {
  Component,
  Provider,
}

interface IComponentProps {
  onClick: (sectionId: number, itemId: number, optionId: PageControlOptions) => void
}

interface IProps {
  children: ReactNode
}
