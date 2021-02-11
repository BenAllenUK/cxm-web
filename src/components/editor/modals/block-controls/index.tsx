import { createContext, memo, ReactNode, RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react'

import { BlockType } from '../../../types'

import OptionControls, { IOptionElements, IOptionHeader, OptionType } from 'components/common/option-controls'
import { BlockTypeProperties } from '../../blocks'
import Image from 'next/image'

import styles from './BlockControls.module.scss'

interface State {
  index: number
  enabled: boolean
  filterText: string | null
  position: { x: number; y: number } | null
}

interface Context extends State {
  showControls: (index: number, position: { x: number; y: number }) => void
  hideControls: () => void
  setFilterText: (value: string) => void
}

const initialState = {
  index: -1,
  enabled: false,
  filterText: null,
  position: null,
}
const initialContextState = {
  ...initialState,
  showControls: () => {},
  hideControls: () => {},
  setFilterText: () => {},
}

const Context = createContext<Context>(initialContextState)

export const useModals = () => useContext(Context)

const BlockControls = ({ rootRef, children, onBlockItemClick }: IProps) => {
  const [state, setState] = useState<State>(initialContextState)

  const showControls = (index: number, position: { x: number; y: number }) => {
    if (!position || !rootRef?.current) {
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

  const hideControls = () => {
    setState({
      enabled: false,
      index: -1,
      filterText: null,
      position: null,
    })
  }

  const _onClick = (key: number) => {
    onBlockItemClick(state.index, key)
  }

  let items: IOptionElements[] = Object.values(BlockTypeProperties).map((item, i) => ({
    id: item.id,
    icon: <Image className={styles.image} width={46} height={46} src={item.image} />,
    title: item.title,
    subtitle: item.subtitle,
    type: OptionType.Button,
  }))

  if (state.filterText) {
    const formattedFilterText = state.filterText.toLowerCase().replace('/', '')
    items = items.filter((item) => item.title.toLowerCase().indexOf(formattedFilterText) > -1)
  }

  return (
    <Context.Provider value={{ ...state, showControls, hideControls, setFilterText }}>
      {state.enabled && state.position && items.length > 0 && (
        <OptionControls
          sections={[{ items: items, title: 'Basic Blocks' }]}
          style={{ left: state.position.x, top: state.position.y }}
          iconClassName={styles.icon}
          onItemClick={_onClick}
          onDismiss={hideControls}
        />
      )}
      {children}
    </Context.Provider>
  )
}

interface IProps {
  rootRef: RefObject<HTMLDivElement>
  children: ReactNode
  onBlockItemClick: (index: number, key: BlockType) => void
}

export default BlockControls
