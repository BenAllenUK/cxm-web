import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Tooltip } from 'components/tooltip'
import LinearProgress from '@material-ui/core/LinearProgress'
import Text from './blocks/Text'
import {
  BlockTypeProperties,
  BLOCK_CONTAINER_VERTICAL_PADDING,
  DEFAULT_BLOCK,
  getBlockOptions,
  isBlockEmpty,
} from './blocks'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText, BlockDataImage, Block } from '../types'

import { IRootState } from 'reducers'
import editor from 'actions/editor'

import BlockControls from './block-controls'
import ReactTooltip from 'react-tooltip'

import styles from './Editor.module.scss'
import Container from './blocks/Container'
import Image from './blocks/Image'
import Divider from './blocks/Divider'
import produce from 'immer'
import BlockItem from './BlockItem'
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from 'deep-object-diff'

class Content extends React.Component<IProps, IState> {
  state = {
    blocks: this.props.blocks,
    sortingIndex: null,
    blockControlsFocusedIndex: -1,
    focusIndex: -1,
  }

  blockRefs: HTMLDivElement[] = []
  bodyRef?: HTMLDivElement

  shouldComponentUpdate(prevProps: any) {
    console.log(diff(prevProps, this.props))
    return true
  }

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyPress)
  }

  onKeyPress = (e: KeyboardEvent) => {
    const filterText = this.getCurrentFilterText()
    if (e.key === 'Tab') {
      // this.closeBlockControl()
    } else if (e.key === 'Backspace' && !filterText) {
      // this.closeBlockControl()
    } else if (e.key === '/' && !filterText) {
      const { blockControlsFocusedIndex } = this.state
      // this.openBlockControl(blockControlsFocusedIndex)
    }
  }

  onAddClick = (index: number) => {
    ReactTooltip.hide()

    const { blocks } = this.props
    const block = blocks[index]
    const isEmpty = isBlockEmpty(block)

    // If empty block then update this one instead
    if (isEmpty) {
      // this.openBlockControl(index)
      return
    }

    this.onCreateBlock(index)
    this.nextFocus(index)
    // this.openBlockControl(index + 1)
  }

  manageControls = () => {
    const { actions } = this.props
    const filterText = this.getCurrentFilterText()
    const options = getBlockOptions(filterText)
    const { blockControlOpen } = this.props
    if (blockControlOpen && options.length === 0) {
      actions.editor.blockControlClose()
    }
  }

  onBlockClick = (index: number) => {
    const { actions } = this.props
    const { textControlOpen, blockControlOpen } = this.props
    if (textControlOpen) {
      actions.editor.textControlClose()
    }
    if (blockControlOpen) {
      actions.editor.blockControlClose()
    }
  }

  onBlockItemClick = (key: BlockType) => {
    const { blockControlsFocusedIndex: index } = this.state
    console.log({ key })
    const isEditable = BlockTypeProperties[key].isEditable

    if (index === -1) return

    // TODO: Reset the filter text
    this.setState(
      produce((draftState) => {
        draftState.blocks[index].type = key
        if (isEditable) {
          draftState.blocks[index].payload.value = ''
        }
      })
    )

    // this.closeBlockControl()
    this.focus(index)
  }

  onBlockDoubleClick = (index: number, pos: { x: number; y: number }) => {
    const { actions } = this.props

    const bodyLeft = this.bodyRef ? this.bodyRef.getBoundingClientRect().left : 0
    const diffLeft = pos.x - bodyLeft
    const newPos = {
      x: diffLeft,
      y: pos.y,
    }

    actions.editor.textControlOpen(newPos)
  }

  onCreateBlock = (index: number) => {
    const newPosition = index + 1
    const { onBlocksUpsert, blocks } = this.props
    const movedBlocks = blocks
      .filter((_, i) => i > newPosition - 1)
      .map((item) => ({ ...item, position: item.position + 1 }))

    // console.log(blocks.map((item) => ({ i: item.id, p: item.position })))
    // console.log(movedBlocks.map((item) => ({ i: item.id, p: item.position })))
    onBlocksUpsert([
      {
        type: BlockType.TEXT,
        payload: {
          value: 'New',
        },
        id: -1,
        parentId: null,
        editingUserId: null,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        position: newPosition,
      },
      // ...movedBlocks,
    ])
    // TODO: this.nextFocus(i) - maybe check to see what else does this?
  }

  onUpdateBlock = (index: number, payload: BlockData) => {
    const { onBlocksUpsert } = this.props

    // onBlocksUpsert([
    //   {
    //     ...item,
    // position: index,
    //   },
    // ])

    // this.setState(
    //   produce((draftState) => {
    //     draftState.blocks[i] = item
    //   }),
    //   onComplete
    // )
    // this.manageControls()
  }

  onDeleteBlock = (index: number) => {
    // TODO: Delete block
    // this.setState(
    //   produce((draftState) => {
    //     draftState.blocks.splice(index, 1)
    //     draftState.blockControlsFocusedIndex = -1
    //   }),
    //   onComplete
    // )
    // this.prevFocus(i)
  }

  onSortStart = (sort: SortStart, event: SortEvent) => {
    this.setState((state) => ({ ...state, sortingIndex: sort.index }))
  }

  onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    this.setState(({ blocks }) => ({
      blocks: arrayMove(blocks, oldIndex, newIndex),
    }))
  }

  onBlockFocus = (index: number) => {
    // this.setState((state) => ({ ...state, blockControlsFocusedIndex: index }))

    const { blocks } = this.props
    if (blocks[index].id) {
      // TODO: Lock block
    }
    // Disable auto undo/redo
  }

  onBlockBlur = (index: number) => {
    // TODO: Update content
    // Enable undo/redo
    const { blocks } = this.props
    if (!blocks[index].id) {
      // TODO: unlock block
    }
    // this.onUpdateTrigger()
  }

  onBodyClick = () => {
    const { blocks } = this.props
    const lastItemIndex = blocks.length - 1
    const lastBlock = blocks[lastItemIndex]
    if (lastBlock.type === BlockType.TEXT && (lastBlock.payload as BlockDataText).value === '') {
      this.focus(lastItemIndex)
      return
    }

    this.onCreateBlock(lastItemIndex)
    this.nextFocus(lastItemIndex)
  }

  prevFocus(index: number) {
    // this.blockRefs[index - 1].focus()
    // this.setState({ focusIndex: index - 1 })
  }

  focus(index: number) {
    console.log(index)
    // this.blockRefs[index].focus()
    // this.setState({ focusIndex: index })
  }

  nextFocus(index: number) {
    // this.blockRefs[index + 1].focus()
    // this.setState({ focusIndex: index + 1 })
  }

  // openBlockControl = (index: number) => {
  //   const { actions } = this.props
  //   const { blocks } = this.props

  //   const blockRef = this.blockRefs[index]
  //   const { top: blockTop, left: blockLeft } = blockRef.getBoundingClientRect()
  //   const bodyTop = this.bodyRef ? this.bodyRef.getBoundingClientRect().top : 0
  //   const bodyLeft = this.bodyRef ? this.bodyRef.getBoundingClientRect().left : 0
  //   const diffTop = blockTop - bodyTop
  //   const diffLeft = blockLeft - bodyLeft
  //   const block = blocks[index]
  //   const initialHeight = BlockTypeProperties[block.type].initialHeight
  //   actions.editor.blockControlOpen({
  //     x: diffLeft,
  //     y: diffTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
  //   })
  // }

  // closeBlockControl = () => {
  //   const { actions } = this.props
  //   actions.editor.blockControlClose()
  // }

  renderBlock = (item: Block, i: number) => {
    const { blockControlOpen } = this.props
    const { focusIndex } = this.state
    const initialHeight = BlockTypeProperties[item.type].initialHeight

    if (focusIndex === i) {
      console.log('render')
      console.log(item.id)
    }

    return (
      <Item index={i} key={item.id}>
        <Container
          index={i}
          initialHeight={initialHeight}
          onClick={this.onBlockClick}
          onAddClick={this.onAddClick}
          onDoubleClick={this.onBlockDoubleClick}
          enableHandle={!blockControlOpen}
        >
          <BlockItem
            index={i}
            focus={focusIndex === i}
            blockControlOpen={blockControlOpen}
            type={item.type}
            payload={item.payload}
            onNew={this.onCreateBlock}
            onUpdate={this.onUpdateBlock}
            onDelete={this.onDeleteBlock}
            onFocus={this.onBlockFocus}
            onBlur={this.onBlockBlur}
          />
        </Container>
      </Item>
    )
  }

  // TODO: Move logic into ControlledText
  getCurrentFilterText() {
    return ''
    const { blockControlsFocusedIndex, blocks } = this.state
    if (blocks.length === 0 || blockControlsFocusedIndex < 0) {
      return null
    }

    const currentBlock = blocks[blockControlsFocusedIndex]
    if (!BlockTypeProperties[currentBlock.type].isEditable) {
      return null
    }

    let value = (currentBlock.payload as BlockDataText).value
    value = value.indexOf('/') === 0 ? value.slice(1) : value
    value = value.toLowerCase()

    return value
  }

  render() {
    const { blocks } = this.props
    const {
      textControlPosition,
      textControlOpen,
      blockControlOpen,
      blockControlPosition,
    } = this.props

    const filterText = this.getCurrentFilterText()
    console.log(blocks)
    console.log('render')
    return (
      <div
        className={styles.body}
        style={{ position: 'relative' }}
        ref={(ref) => {
          if (!ref) return
          this.bodyRef = ref
        }}
        onClick={this.onBodyClick}
      >
        {textControlOpen && <TextControls position={textControlPosition} />}
        {blockControlOpen && (
          <BlockControls
            onClick={this.onBlockItemClick}
            filterText={filterText}
            position={blockControlPosition}
          />
        )}
        <div onClick={(e) => e.stopPropagation()}>
          <List onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} useDragHandle={true}>
            {blocks
              .sort((a: Block, b: Block) => a.position - b.position)
              .map((item, i) => this.renderBlock(item, i))}
          </List>
          <Tooltip id={'editor'} />
        </div>
      </div>
    )
  }
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const ItemContainer = ({ children }: any) => <div>{children}</div>

const List = StyledList //SortableContainer(StyledList)
const Item = ItemContainer // SortableElement(ItemContainer)

interface IProps extends ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps> {
  id: number
  blocks: Block[]
  onBlocksUpsert: (blocks: Block[]) => void
  onBlockDelete: (index: number) => void
}

interface IState {
  blocks: Block[]
  blockControlsFocusedIndex: number
  focusIndex: number
}

function mapStateToProps(state: IRootState) {
  return {
    textControlOpen: state.editor.textControlOpen,
    textControlPosition: state.editor.textControlPosition,
    blockControlOpen: state.editor.blockControlOpen,
    blockControlPosition: state.editor.blockControlPosition,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      editor: bindActionCreators(editor, dispatch),
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
