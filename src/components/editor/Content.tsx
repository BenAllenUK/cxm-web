import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { Tooltip } from 'components/tooltip'

import Text from './blocks/Text'
import {
  BlockTypeProperties,
  BLOCK_CONTAINER_VERTICAL_PADDING,
  DEFAULT_BLOCK,
  getBlockOptions,
  isBlockEmpty,
} from './blocks'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText, BlockDataImage } from '../types'

import { IRootState } from 'reducers'
import editor from 'actions/editor'

import BlockControls from './block-controls'
import ReactTooltip from 'react-tooltip'

import styles from './Editor.module.scss'
import Container from './blocks/Container'
import Image from './blocks/Image'
import Divider from './blocks/Divider'
import produce from 'immer'

class Content extends React.Component<IProps, IState> {
  state = {
    blocks: this.props.blocks,
    sortingIndex: null,
    blockControlsFocusedIndex: -1,
  }

  blockRefs: HTMLDivElement[] = []
  bodyRef?: HTMLDivElement

  componentDidMount() {
    document.addEventListener('keyup', this.onKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.onKeyPress)
  }

  onKeyPress = (e: KeyboardEvent) => {
    const filterText = this.getCurrentFilterText()
    if (e.key === 'Tab') {
      this.closeBlockControl()
    } else if (e.key === 'Backspace' && !filterText) {
      this.closeBlockControl()
    } else if (e.key === '/' && !filterText) {
      const { blockControlsFocusedIndex } = this.state
      this.openBlockControl(blockControlsFocusedIndex)
    }
  }

  onAddClick = (index: number) => {
    ReactTooltip.hide()

    const { blocks } = this.state
    const block = blocks[index]
    const isEmpty = isBlockEmpty(block)

    // If empty block then update this one instead
    if (isEmpty) {
      this.openBlockControl(index)
      return
    }

    this.onCreateBlock(index, () => {
      this.nextFocus(index)
      this.openBlockControl(index + 1)
    })
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

    const isEditable = BlockTypeProperties[key].isEditable

    if (index === -1) return

    this.setState(
      produce((draftState) => {
        draftState.blocks[index].type = key
        if (isEditable) {
          draftState.blocks[index].value = ''
        }
      })
    )

    this.closeBlockControl()
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

  onCreateBlock = (index: number, onComplete?: () => void) => {
    this.setState(
      produce((draftState) => {
        draftState.blocks.splice(index + 1, 0, DEFAULT_BLOCK)
      }),
      onComplete
    )
  }

  onUpdateBlock = (i: number, item: BlockData, onComplete?: () => void) => {
    this.setState(
      produce((draftState) => {
        draftState.blocks[i] = item
      }),
      onComplete
    )
  }

  onDeleteBlock = (index: number, onComplete?: () => void) => {
    this.setState(
      produce((draftState) => {
        draftState.blocks.splice(index, 1)
        draftState.blockControlsFocusedIndex = -1
      }),
      onComplete
    )
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
    this.setState((state) => ({ ...state, blockControlsFocusedIndex: index }))
    // TODO: Lock block
    // Disable auto undo/redo
  }

  onBlockBlur = (index: number) => {
    // TODO: Update content
    // Enable undo/redo

    // if (this.props.blocks[index] === this.state.blocks[index]) {
    console.log('update content')
    // }
  }

  prevFocus(index: number) {
    this.blockRefs[index - 1].focus()
  }

  focus(index: number) {
    this.blockRefs[index].focus()
  }

  nextFocus(index: number) {
    this.blockRefs[index + 1].focus()
  }

  openBlockControl = (index: number) => {
    const { actions } = this.props
    const { blocks } = this.state

    const blockRef = this.blockRefs[index]
    const { top: blockTop, left: blockLeft } = blockRef.getBoundingClientRect()
    const bodyTop = this.bodyRef ? this.bodyRef.getBoundingClientRect().top : 0
    const bodyLeft = this.bodyRef ? this.bodyRef.getBoundingClientRect().left : 0
    const diffTop = blockTop - bodyTop
    const diffLeft = blockLeft - bodyLeft
    const block = blocks[index]
    const initialHeight = BlockTypeProperties[block.type].initialHeight
    actions.editor.blockControlOpen({
      x: diffLeft,
      y: diffTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
    })
  }

  closeBlockControl = () => {
    const { actions } = this.props
    actions.editor.blockControlClose()
  }

  renderBlock = (item: BlockData, i: number) => {
    const { blockControlOpen } = this.props
    const initialHeight = BlockTypeProperties[item.type].initialHeight
    return (
      <Item index={i} key={`${i}`}>
        <Container
          initialHeight={initialHeight}
          onClick={() => this.onBlockClick(i)}
          onAddClick={() => this.onAddClick(i)}
          onDoubleClick={(pos) => this.onBlockDoubleClick(i, pos)}
          enableHandle={!blockControlOpen}
        >
          {this.renderBlockItem(item, i)}
        </Container>
      </Item>
    )
  }

  renderBlockItem = (item: BlockData, i: number) => {
    const { blockControlOpen, actions } = this.props

    const refCallback = (ref: any) => {
      if (!ref) return
      this.blockRefs[i] = ref
    }

    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
      case BlockType.CALLOUT:
      case BlockType.CODE:
      case BlockType.QUOTE: {
        const content: BlockDataText = item as BlockDataText

        return (
          <Text
            innerRef={refCallback}
            tabIndex={i}
            content={content}
            filteringMode={blockControlOpen}
            onNew={() =>
              this.onCreateBlock(i, () => {
                this.nextFocus(i)
              })
            }
            onUpdate={(item) =>
              this.onUpdateBlock(i, item, () => {
                this.manageControls()
              })
            }
            onDelete={() =>
              this.onDeleteBlock(i, () => {
                this.prevFocus(i)
              })
            }
            onFocus={() => this.onBlockFocus(i)}
            onBlur={() => this.onBlockBlur(i)}
          />
        )
      }
      case BlockType.IMAGE: {
        const content: BlockDataImage = item as BlockDataImage
        return <Image innerRef={refCallback} content={content} />
      }
      case BlockType.DIVIDER:
        return <Divider innerRef={refCallback} />
      default:
        return <div />
    }
  }

  getCurrentFilterText() {
    const { blockControlsFocusedIndex, blocks } = this.state
    if (blocks.length === 0 || blockControlsFocusedIndex < 0) {
      return null
    }

    const currentBlock = blocks[blockControlsFocusedIndex]
    if (!BlockTypeProperties[currentBlock.type].isEditable) {
      return null
    }

    let value = (currentBlock as BlockDataText).value
    value = value.indexOf('/') === 0 ? value.slice(1) : value
    value = value.toLowerCase()

    return value
  }

  render() {
    const { blocks } = this.state
    const {
      textControlPosition,
      textControlOpen,
      blockControlOpen,
      blockControlPosition,
    } = this.props

    const filterText = this.getCurrentFilterText()

    return (
      <div
        className={styles.body}
        style={{ position: 'relative' }}
        ref={(ref) => {
          if (!ref) return
          this.bodyRef = ref
        }}
      >
        {textControlOpen && <TextControls position={textControlPosition} />}
        {blockControlOpen && (
          <BlockControls
            onClick={this.onBlockItemClick}
            filterText={filterText}
            position={blockControlPosition}
          />
        )}

        <List onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} useDragHandle={true}>
          {blocks.map((item, i) => this.renderBlock(item, i))}
        </List>
        <Tooltip id={'editor'} />
      </div>
    )
  }
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const ItemContainer = ({ children }: any) => <div>{children}</div>

const List = SortableContainer(StyledList)
const Item = SortableElement(ItemContainer)

interface IProps extends ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps> {
  id: number
  blocks: BlockData[]
}

interface IState {
  blocks: BlockData[]
  blockControlsFocusedIndex: number
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
