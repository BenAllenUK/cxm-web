import { useRef, useCallback, SyntheticEvent } from 'react'
import { SortEnd } from 'react-sortable-hoc'
import { isBlockEmpty } from '../blocks'
import { BlockData, BlockType, BlockDataText, BlockDataImage, Block } from '../blocks/types'

import useWindowKeyUp from 'utils/hooks/useWindowKeyUp'
import { calculateBlockControlsPosition, useBlockControlModal } from '../modals/block-controls'
import { useTextControlModal } from '../modals/text-controls'
import { useBlockControlsContext } from '../modals/block-controls/BlockControlsContext'
import createEmptyBlock from 'utils/blocks/createEmptyBlock'
import SortableList from './SortableList'
import { getSelectionMidPosition } from 'utils/modals/getSelectionMidPosition'

const List = ({ blocks, onBlocksUpsert, onBlocksDelete, setFocusIndex, focusIndex }: IProps) => {
  const blockRefs = useRef<HTMLDivElement[]>([])

  const {
    enabled: modalBlockEnabled,
    showControls: showBlockControlsModal,
    hideControls: hideBlockControls,
  } = useBlockControlModal()
  const { setBlockId: setBlockControlsId } = useBlockControlsContext()

  const { filterText: modalFilterText, setFilterText } = useBlockControlsContext()

  const { showControls: showTextControls } = useTextControlModal()

  const _showBlockControls = useCallback(
    (index: number) => {
      const blockRef = blockRefs.current[index]
      if (!blockRef) {
        return
      }

      const block = blocks[index]
      const position = calculateBlockControlsPosition(blockRef, block)
      setBlockControlsId(block.id)
      showBlockControlsModal(position)
    },
    [showBlockControlsModal, blocks]
  )

  useWindowKeyUp(
    'Tab',
    () => {
      hideBlockControls()
    },
    [hideBlockControls]
  )

  useWindowKeyUp(
    'Backspace',
    () => {
      if (!modalFilterText) {
        hideBlockControls()
      }
    },
    [hideBlockControls, modalFilterText]
  )

  useWindowKeyUp(
    '/',
    () => {
      _showBlockControls(focusIndex)
    },
    [_showBlockControls, focusIndex]
  )

  const _onBlockAddClick = (index: number) => {
    const block = blocks[index]
    const isEmpty = isBlockEmpty(block)
    if (isEmpty) {
      _showBlockControls(index)
      setFocusIndex(index)
      return
    }

    _onCreateBlock(index)
    setFocusIndex(index + 1)
    _showBlockControls(index + 1)
  }

  const _onBlockClick = (index: number) => {}

  const _onBlockDoubleClick = (index: number, pos: { x: number; y: number }) => {}

  const _onBlockSelect = (index: number, e: SyntheticEvent<HTMLDivElement>) => {
    const position = getSelectionMidPosition()
    showTextControls(position)
  }

  const _onCreateBlock = async (sourceIndex: number) => {
    const newPosition = sourceIndex + 1

    const nextBlock = blocks[newPosition]
    if (nextBlock && isBlockEmpty(nextBlock)) {
      setFocusIndex(newPosition)
      return
    }

    setFocusIndex(newPosition)
    const newBlock = createEmptyBlock(newPosition)
    onBlocksUpsert([newBlock])
  }

  const _onUpdateBlock = (index: number, payload: BlockData) => {
    const block = blocks[index]
    onBlocksUpsert([
      {
        ...block,
        payload,
        position: index,
      },
    ])
  }

  const _onDeleteBlock = (index: number) => {
    setFocusIndex(index - 1)
    onBlocksDelete([blocks[index].id])
  }

  const _onBlockFocus = (index: number) => {
    // This often gets called multiple times because when we programmatically focus, it will also call this.
    if (index === focusIndex) {
      return
    }
    setFocusIndex(index)

    // TODO: Disable auto undo/redo
  }

  const _onBlockBlur = (index: number) => {
    // TODO: Enable auto undo/redo
    // Why do we need to do this?: Answer when pressing /heading 2 and it will not move onto next item
    if (index === focusIndex) {
      setFocusIndex(-1)
    }
  }

  const _onBodyClick = () => {
    if (blocks.length === 1) {
      const [block] = blocks
      if (block.type === BlockType.TEXT && isBlockEmpty(block)) {
        setFocusIndex(0)
        return
      }
    }

    const lastItemIndex = blocks.length - 1
    const lastBlock = blocks[lastItemIndex]
    if (lastBlock.type === BlockType.TEXT && (lastBlock.payload as BlockDataText).value === '') {
      setFocusIndex(lastItemIndex)
      return
    }
    _onCreateBlock(lastItemIndex)
  }

  const _onTextChange = (_: number, value: string) => {
    setFilterText(value)
  }

  const _onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const [block] = blocks.filter((item) => item.position === oldIndex)
    onBlocksUpsert([{ ...block, position: newIndex }])
  }

  return (
    <SortableList
      itemRefFunc={(_ref: HTMLDivElement, position: number) => {
        blockRefs.current[position] = _ref
      }}
      modalBlockEnabled={modalBlockEnabled}
      focusIndex={focusIndex}
      blocks={blocks}
      onBodyClick={_onBodyClick}
      onSortEnd={_onSortEnd}
      onBlockClick={_onBlockClick}
      onBlockAddClick={_onBlockAddClick}
      onBlockDoubleClick={_onBlockDoubleClick}
      onTextChange={_onTextChange}
      onNew={_onCreateBlock}
      onUpdate={_onUpdateBlock}
      onDelete={_onDeleteBlock}
      onFocus={_onBlockFocus}
      onBlur={_onBlockBlur}
      onSelect={_onBlockSelect}
    />
  )
}

interface IProps {
  focusIndex: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlocksDelete: (ids: number[]) => void
  setFocusIndex: (n: number) => void
}

export default List
