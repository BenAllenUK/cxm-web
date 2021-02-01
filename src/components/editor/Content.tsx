import { useRef, useCallback, useEffect, useState, memo, createRef } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Tooltip } from 'components/tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import Text from './blocks/Text'
import { BlockTypeProperties, BLOCK_CONTAINER_VERTICAL_PADDING, DEFAULT_BLOCK, getBlockOptions, isBlockEmpty } from './blocks'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText, BlockDataImage, Block } from '../types'

import ReactTooltip from 'react-tooltip'

import styles from './Editor.module.scss'
import Container from './blocks/Container'

import BlockItem from './BlockItem'
import { useWindowKeyUp } from 'utils/hooks'
import { useModals } from './modals'

const Content = ({ blocks, onBlocksUpsert, onBlockDelete }: IProps) => {
  const [focusIndex, setFocusIndex] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)

  const blockRefs = useRef<HTMLDivElement[]>([])

  const {
    block: { filterText, enabled: modalBlockEnabled },
    toggleBlockControls,
    toggleTextControls,
    setBlockControlsFilterText,
  } = useModals()

  useWindowKeyUp('Tab', () => {
    toggleBlockControls(false)
  })

  useWindowKeyUp(
    'Backspace',
    () => {
      if (!filterText) {
        toggleBlockControls(false)
      }
    },
    [filterText]
  )

  useWindowKeyUp(
    '/',
    () => {
      openBlockControl(focusIndex)
    },
    [filterText, focusIndex]
  )

  const _onAddClick = (index: number) => {
    ReactTooltip.hide()
    openBlockControl(index)
    setFocusIndex(index)
    return

    const block = blocks[index]
    const isEmpty = isBlockEmpty(block)

    // If empty block then update this one instead
    if (isEmpty) {
      openBlockControl(index)
      return
    }

    _onCreateBlock(index + 1)
    setFocusIndex(index + 1)
    openBlockControl(index + 1)
  }

  // const manageControls = () => {

  //   const filterText = this.getCurrentFilterText()
  //   const options = getBlockOptions(filterText)
  //   const { modalBlockEnabled } = this.props
  //   if (modalBlockEnabled && options.length === 0) {
  //     toggleBlockControls(false)
  //   }
  // }

  const _onBlockClick = (index: number) => {}

  const _onBlockDoubleClick = (index: number, pos: { x: number; y: number }) => {
    const bodyLeft = bodyRef.current ? bodyRef.current.getBoundingClientRect().left : 0
    const diffLeft = pos.x - bodyLeft
    const newPos = {
      x: diffLeft,
      y: pos.y,
    }
    toggleTextControls(true, newPos)
  }

  const _onCreateBlock = async (index: number) => {
    const newPosition = index + 1
    console.log({ newPosition })

    const nextBlock = blocks[newPosition]
    if (nextBlock && isBlockEmpty(nextBlock)) {
      setFocusIndex(newPosition)
      return
    }

    setFocusIndex(newPosition)

    onBlocksUpsert([
      {
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
      },
    ])
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

    // this.manageControls()
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

  const openBlockControl = (index: number) => {
    const blockRef = blockRefs.current[index]
    if (!bodyRef.current || !blockRef) {
      return
    }

    const { top: blockTop, left: blockLeft } = blockRef.getBoundingClientRect()
    const bodyTop = bodyRef ? bodyRef.current.getBoundingClientRect().top : 0
    const bodyLeft = bodyRef ? bodyRef.current.getBoundingClientRect().left : 0
    const diffTop = blockTop - bodyTop
    const diffLeft = blockLeft - bodyLeft
    const block = blocks[index]
    const initialHeight = BlockTypeProperties[block.type].initialHeight
    toggleBlockControls(true, index, {
      x: diffLeft,
      y: diffTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
    })
  }

  const _onTextChange = (index: number, value: string) => {
    console.log(value)
    setBlockControlsFilterText(value)
  }

  return (
    <div className={styles.body} style={{ position: 'relative' }} ref={bodyRef} onClick={_onBodyClick}>
      <div onClick={(e) => e.stopPropagation()}>
        {/* onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} */}
        <List useDragHandle={true}>
          {blocks
            .sort((a: Block, b: Block) => a.position - b.position)
            .map((item, i) => {
              return (
                <Container
                  key={item.id}
                  index={i}
                  initialHeight={BlockTypeProperties[item.type].initialHeight}
                  onClick={_onBlockClick}
                  onAddClick={_onAddClick}
                  onDoubleClick={_onBlockDoubleClick}
                  enableHandle={!modalBlockEnabled}
                >
                  <div
                    ref={(_ref: any) => {
                      if (_ref) {
                        blockRefs.current[i] = _ref
                      }
                    }}
                  >
                    <BlockItem
                      key={`${item.id}-${item.type}-${item.updatedAt}`}
                      xData={`${item.id}-${item.type}-${item.updatedAt}`}
                      index={i}
                      focus={focusIndex === i}
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
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlockDelete: (id: number) => void
}

export default Content
