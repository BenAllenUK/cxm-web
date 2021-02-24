import { useRef, useCallback, useEffect, useState, memo, createRef } from 'react'
import { SortableContainer, SortableElement, SortEnd, SortEvent, SortStart } from 'react-sortable-hoc'
import { Tooltip } from 'components/common/tooltip'
import { BlockTypeProperties, BLOCK_CONTAINER_VERTICAL_PADDING, DEFAULT_BLOCK, getBlockOptions, isBlockEmpty } from '../blocks'
import { BlockData, BlockType, BlockDataText, BlockDataImage, Block } from '../blocks/types'

import ReactTooltip from 'react-tooltip'

import styles from '../Editor.module.scss'
import Container from '../blocks/core/Container'

import Item from './Item'
import useWindowKeyUp from 'utils/hooks/useWindowKeyUp'
import { useBlockControlModal } from '../modals/block-controls'
import { useTextControlModal } from '../modals/text-controls'
import { useBlockControlsContext } from '../modals/block-controls/BlockControlsContext'
import createEmptyBlock from 'utils/blocks/createEmptyBlock'

const List = ({ blocks, onBlocksUpsert, onBlocksDelete, setFocusIndex, focusIndex }: IProps) => {
  const blockRefs = useRef<HTMLDivElement[]>([])

  const { enabled: modalBlockEnabled, showControls: showBlockControls, hideControls: hideBlockControls } = useBlockControlModal()
  const { setBlockId: setBlockControlsId } = useBlockControlsContext()

  const { filterText: modalFilterText, setFilterText } = useBlockControlsContext()

  const { showControls: showTextControls, hideControls: hideTextControls } = useTextControlModal()

  useWindowKeyUp('Tab', () => {
    hideBlockControls()
  })

  useWindowKeyUp(
    'Backspace',
    () => {
      if (!modalFilterText) {
        hideBlockControls()
      }
    },
    [hideBlockControls, modalFilterText]
  )

  const _onAddClick = (index: number) => {
    ReactTooltip.hide()
    const block = blocks[index]
    const isEmpty = isBlockEmpty(block)
    if (isEmpty) {
      openBlockControl(index)
      setFocusIndex(index)
      return
    }

    _onCreateBlock(index)
    setFocusIndex(index + 1)
    openBlockControl(index + 1)
  }

  const _onBlockClick = (index: number) => {}

  const _onBlockDoubleClick = (index: number, pos: { x: number; y: number }) => {
    showTextControls(pos)
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
    console.log(payload)
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
    const lastItemIndex = blocks.length - 1
    const lastBlock = blocks[lastItemIndex]
    if (lastBlock.type === BlockType.TEXT && (lastBlock.payload as BlockDataText).value === '') {
      setFocusIndex(lastItemIndex)
      return
    }
    _onCreateBlock(lastItemIndex)
  }

  const openBlockControl = useCallback(
    (index: number) => {
      const blockRef = blockRefs.current[index]
      if (!blockRef) {
        return
      }

      const { top: blockTop, left: blockLeft } = blockRef.getBoundingClientRect()

      const block = blocks[index]
      const initialHeight = BlockTypeProperties[block.type].initialHeight
      setBlockControlsId(block.id)
      showBlockControls({
        x: blockLeft,
        y: blockTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
      })
    },
    [showBlockControls, blocks]
  )
  useWindowKeyUp(
    '/',
    () => {
      openBlockControl(focusIndex)
    },
    [openBlockControl, focusIndex]
  )

  const _onTextChange = (index: number, value: string) => {
    setFilterText(value)
  }

  const _onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const [block] = blocks.filter((item) => item.position === oldIndex)
    onBlocksUpsert([{ ...block, position: newIndex }])
  }

  // TODO: Move into sortable list / sortable item
  return (
    <div className={styles.body} onClick={_onBodyClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <SortableList onSortEnd={_onSortEnd} useDragHandle={true}>
          {blocks
            .sort((a: Block, b: Block) => a.position - b.position)
            .map((item, i) => {
              return (
                <SortableItem index={item.position} key={`${item.id}-${item.position}`}>
                  <Container
                    index={item.position}
                    initialHeight={BlockTypeProperties[item.type].initialHeight}
                    onClick={_onBlockClick}
                    onAddClick={_onAddClick}
                    onDoubleClick={_onBlockDoubleClick}
                    enableHandle={!modalBlockEnabled}
                  >
                    <div
                      ref={(_ref: any) => {
                        if (_ref) {
                          blockRefs.current[item.position] = _ref
                        }
                      }}
                    >
                      <Item
                        index={item.position}
                        focus={focusIndex === item.position}
                        blockControlOpen={modalBlockEnabled}
                        type={item.type}
                        payload={item.payload}
                        onTextChange={_onTextChange}
                        onNew={_onCreateBlock}
                        onUpdate={_onUpdateBlock}
                        onDelete={_onDeleteBlock}
                        onFocus={_onBlockFocus}
                        onBlur={_onBlockBlur}
                      />
                    </div>
                  </Container>
                </SortableItem>
              )
            })}
        </SortableList>
        <Tooltip id={'editor'} />
      </div>
    </div>
  )
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const ItemContainer = ({ children }: any) => children

const SortableList = SortableContainer(StyledList)
const SortableItem = SortableElement(ItemContainer)

interface IProps {
  focusIndex: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlocksDelete: (ids: number[]) => void
  setFocusIndex: (n: number) => void
}

export default List
