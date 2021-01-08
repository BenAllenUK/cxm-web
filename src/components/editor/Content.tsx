import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import Colors from 'config/colors'
import BlockText from './blocks/BlockText'
import {
  BlockInitialHeight,
  BlockTypeLabels,
  BLOCK_CONTAINER_VERTICAL_PADDING,
  DEFAULT_BLOCK,
  isBlockEmpty,
} from './blocks'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText } from '../types'

import { IAppState } from 'reducers'
import editor from 'actions/editor'

import BlockControls from './block-controls'
import ReactTooltip from 'react-tooltip'

import styles from './Content.module.scss'

class Content extends React.Component<IProps, IState> {
  state = {
    blocks: this.props.blocks,
    sortingIndex: null,
    filterControlsText: null,
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
    if (e.key === 'Tab') {
      this.closeBlockControl()
    }
  }

  // TODO: Add timer to commit blocks to store

  onAddClick = (index: number) => {
    ReactTooltip.hide()

    const { blocks } = this.state

    const isEmpty = isBlockEmpty(blocks[index])

    if (isEmpty) {
      const blockRef = this.blockRefs[index]
      this.setState({ filterControlsText: null })
      this.openBlockControl(index)
      blockRef.focus()
      return
    }

    this.onCreateBlock(index, () => {
      this.setState({ filterControlsText: null })
      this.openBlockControl(index + 1)
    })
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

    if (index === -1) return

    this.setState({ filterControlsText: null })

    this.setState((prevState) => {
      const blocks = [...prevState.blocks]

      blocks[index] = { ...DEFAULT_BLOCK }
      // TODO: Insert empty block
      blocks[index].type = key

      return {
        ...prevState,
        blocks,
      }
    })

    this.closeBlockControl()
    this.blockRefs[index].focus()
  }

  onBlockDoubleClick = (index: number, pos: { x: number; y: number }) => {
    const { actions } = this.props
    actions.editor.textControlOpen(pos)
  }

  onCreateBlock = (index: number, onComplete?: () => void) => {
    this.setState(
      (state) => {
        const blocks = [...state.blocks]
        blocks.splice(index + 1, 0, { ...DEFAULT_BLOCK })

        return {
          ...state,
          blocks,
        }
      },
      () => {
        this.blockRefs[index + 1].focus()
        onComplete && onComplete()
      }
    )
  }

  onUpdateBlock = (i: number, item: BlockData) => {
    this.setState((prevState, props) => {
      const blocks = [...prevState.blocks]
      blocks[i] = item
      return {
        ...prevState,
        blocks,
      }
    })
  }

  onDeleteBlock = (index: number) => {
    this.blockRefs[index - 1].focus()

    this.setState((state) => {
      const blocks = [...state.blocks.filter((_, i) => i !== index)]
      return {
        ...state,
        blocks,
      }
    })
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
  }

  onCommandUpdate = (index: number, value: string) => {
    const { actions, blockControlOpen } = this.props

    if (value.length === 0) {
      this.setState({ filterControlsText: value })
      return
    }

    if (value === '/') {
      if (!blockControlOpen) {
        this.openBlockControl(index)
      }
      return
    }

    const formattedValue = value.indexOf('/') === 0 ? value.slice(1) : value

    const titles = Object.values(BlockTypeLabels).filter(
      (item) => item.title.toLowerCase().indexOf(formattedValue) > -1
    )

    if (titles.length == 0) {
      if (blockControlOpen) {
        this.closeBlockControl()
      }
      return
    }

    this.setState({ filterControlsText: formattedValue })
  }

  openBlockControl = (index: number) => {
    const { actions } = this.props
    const { blocks } = this.state

    const blockRef = this.blockRefs[index]
    const { top: blockTop, left: blockLeft } = blockRef.getBoundingClientRect()
    const bodyTop = this.bodyRef ? this.bodyRef.getBoundingClientRect().top : 0
    const diffTop = blockTop - bodyTop
    const block = blocks[index]
    const initialHeight = BlockInitialHeight[block.type]
    actions.editor.blockControlOpen({
      x: blockLeft,
      y: diffTop + initialHeight + BLOCK_CONTAINER_VERTICAL_PADDING,
    })

    this.setState((state) => ({ ...state, blockControlsFocusedIndex: index }))
  }

  closeBlockControl = () => {
    const { actions } = this.props
    actions.editor.blockControlClose()
  }

  renderBlock = (item: BlockData, i: number) => {
    return (
      <Item index={i} key={`${i}`}>
        <div id={`block-${i}`}>{this.renderBlockItem(item, i)}</div>
      </Item>
    )
  }

  renderBlockItem = (item: BlockData, i: number) => {
    const { blockControlOpen, actions } = this.props

    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
        const itemText: BlockDataText = item as BlockDataText

        return (
          <BlockText
            innerRef={(ref) => {
              if (!ref) return
              this.blockRefs[i] = ref
            }}
            tabIndex={i}
            enableHandle={!blockControlOpen}
            enableEnterToAdd={!blockControlOpen}
            content={itemText}
            onAddClick={() => this.onAddClick(i)}
            onNew={() => this.onCreateBlock(i)}
            onUpdate={(arg0) => this.onUpdateBlock(i, arg0)}
            onDelete={() => this.onDeleteBlock(i)}
            onDoubleClick={(pos) => this.onBlockDoubleClick(i, pos)}
            onFocus={() => this.onBlockFocus(i)}
            onBlur={() => this.onBlockBlur(i)}
            onClick={() => this.onBlockClick(i)}
            filteringMode={blockControlOpen}
            onCommandUpdate={(value) => this.onCommandUpdate(i, value)}
          />
        )
      default:
        return <div />
    }
  }

  render() {
    const { filterControlsText, blocks } = this.state
    const {
      textControlPosition,
      textControlOpen,
      blockControlOpen,
      blockControlPosition,
    } = this.props

    return (
      <div
        className={styles.body}
        ref={(ref) => {
          if (!ref) return
          this.bodyRef = ref
        }}
      >
        {textControlOpen && <TextControls position={textControlPosition} />}
        {blockControlOpen && (
          <BlockControls
            onClick={this.onBlockItemClick}
            filterText={filterControlsText}
            position={blockControlPosition}
          />
        )}

        <List onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} useDragHandle={true}>
          {blocks.map((item, i) => this.renderBlock(item, i))}
        </List>
      </div>
    )
  }
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const ItemContainer = ({ children }: any) => <div className={styles.container}>{children}</div>

const List = SortableContainer(StyledList)
const Item = SortableElement(ItemContainer)

interface IProps extends ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps> {
  blocks: BlockData[]
}

interface IState {
  blocks: BlockData[]
  filterControlsText: string | null
  blockControlsFocusedIndex: number
}

function mapStateToProps(state: IAppState) {
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
