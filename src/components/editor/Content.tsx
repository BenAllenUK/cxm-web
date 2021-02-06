import { useRef, useCallback, useEffect, useState, memo, createRef } from 'react'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import { Tooltip } from 'components/tooltip'
import { BlockTypeProperties, BLOCK_CONTAINER_VERTICAL_PADDING, DEFAULT_BLOCK, getBlockOptions, isBlockEmpty } from './blocks'
import { BlockData, BlockType, BlockDataText, BlockDataImage, Block } from '../types'

import ReactTooltip from 'react-tooltip'

import styles from './Editor.module.scss'
import Container from './blocks/Container'

import BlockItem from './BlockItem'
import { useWindowKeyUp } from 'utils/hooks'
import { useModals as useBlockModals } from './modals/block-controls'
import { useModals as useTextModals } from './modals/text-controls'

const Content = ({ blocks, onBlocksUpsert, onBlockDelete, setFocusIndex, focusIndex }: IProps) => {
  const blockRefs = useRef<HTMLDivElement[]>([])

  const {
    filterText: modalFilterText,
    enabled: modalBlockEnabled,
    showControls: showBlockControls,
    hideControls: hideBlockControls,
    setFilterText,
  } = useBlockModals()

  const { showControls: showTextControls, hideControls: hideTextControls } = useTextModals()

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
    onBlocksUpsert({
      type: BlockType.TEXT,
      payload: {
        value: '',
      },
      id: Math.round(Math.random() * -1000000),
      parentId: null,
      editingUserId: null,

      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      position: newPosition,
    })
  }

  const _onUpdateBlock = (index: number, payload: BlockData) => {
    const block = blocks[index]
    onBlocksUpsert({
      ...block,
      payload,
      position: index,
    })
  }

  const _onDeleteBlock = (index: number) => {
    onBlockDelete(blocks[index].id)
    setFocusIndex(index - 1)
  }

  const _onBlockFocus = (index: number) => {
    setFocusIndex(index)
    // TODO: Lock block
    // TODO: Disable auto undo/redo
  }

  const _onBlockBlur = (index: number) => {
    // TOOD: Unlock block
    // TODO: Enable auto undo/redo
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
      showBlockControls(index, {
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

  return (
    <div className={styles.body} onClick={_onBodyClick}>
      <div onClick={(e) => e.stopPropagation()}>
        {/* onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} */}
        <List useDragHandle={true}>
          {blocks
            .sort((a: Block, b: Block) => a.position - b.position)
            .map((item, i) => {
              return (
                <Container
                  key={`${item.id}-${item.position}`} // very important
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
                    <BlockItem
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
              )
            })}
        </List>
        <Tooltip id={'editor'} />
      </div>
    </div>
  )
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const ItemContainer = ({ children }: any) => <div>{children}</div>

const List = StyledList //SortableContainer(StyledList)
const Item = ItemContainer // SortableElement(ItemContainer)

interface IProps {
  focusIndex: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block) => void
  onBlockDelete: (id: number) => void
  setFocusIndex: (n: number) => void
}

export default Content
