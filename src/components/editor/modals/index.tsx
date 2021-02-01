import { BlockType } from 'components/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode } from 'react'

import BlockControls from '../block-controls'
import TextControls from '../text-controls'

interface BlockContext {
  index: number
  enabled: boolean
  filterText: string | null
  position: { x: number; y: number } | null
}

interface TextContext {
  enabled: boolean
  position: { x: number; y: number } | null
}

interface Context {
  block: BlockContext
  text: TextContext
}

interface ContextActions extends Context {
  toggleBlockControls: (enabled: boolean, index?: number, position?: { x: number; y: number }) => void
  toggleTextControls: (enabled: boolean, position?: { x: number; y: number }) => void

  setBlockControlsFilterText: (value: string) => void
}

const initialBlockState = {
  index: -1,
  enabled: false,
  filterText: null,
  position: null,
}

const initialTextState = {
  enabled: false,
  position: null,
}

const initialState = {
  block: initialBlockState,
  text: initialTextState,
  toggleBlockControls: () => {},
  toggleTextControls: () => {},
  setBlockControlsFilterText: () => {},
}

const ModalContext = createContext<ContextActions>(initialState)

export const useModals = () => useContext(ModalContext)

const Modals = ({ children, onBlockItemClick }: IProps) => {
  const [textState, setTextState] = useState<TextContext>(initialTextState)
  const [blockState, setBlockState] = useState<BlockContext>(initialBlockState)

  const toggleBlockControls = (enabled: boolean, index?: number, position?: { x: number; y: number }) => {
    setBlockState({
      enabled,
      index: index || 0, // TODO: Handle index
      filterText: null,
      position: position || null,
    })
  }

  const toggleTextControls = (enabled: boolean, position?: { x: number; y: number }) => {
    setTextState({
      enabled,
      position: position || null,
    })
  }

  const setBlockControlsFilterText = (filterText: string) => {
    setBlockState((state) => ({
      ...state,
      filterText,
    }))
  }

  const onDismissTextControls = useCallback(() => {
    toggleBlockControls(false)
  }, [])

  const onDismissBlockControls = useCallback(() => {
    toggleBlockControls(false)
  }, [])

  const _onBlockItemClick = (key: number) => {
    onBlockItemClick(blockState.index, key)
  }

  return (
    <ModalContext.Provider
      value={{ block: blockState, text: textState, toggleBlockControls, toggleTextControls, setBlockControlsFilterText }}
    >
      {textState.enabled && textState.position && (
        <TextControls position={textState.position} onDismiss={onDismissTextControls} />
      )}
      {blockState.enabled && blockState.position && (
        <BlockControls
          filterText={blockState.filterText}
          position={blockState.position}
          onDismiss={onDismissBlockControls}
          onClick={_onBlockItemClick}
        />
      )}
      {children}
    </ModalContext.Provider>
  )
}

export default memo(Modals)

interface IProps {
  children: ReactNode
  onBlockItemClick: (index: number, key: BlockType) => void
}
