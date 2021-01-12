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
  isBlockEmpty,
} from './blocks'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText, BlockDataImage } from '../types'

import { IAppState } from 'reducers'
import editor from 'actions/editor'

import BlockControls from './block-controls'
import ReactTooltip from 'react-tooltip'

import styles from './Content.module.scss'
import Container from './blocks/Container'
import Image from './blocks/Image'
import Divider from './blocks/Divider'

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
    const { filterControlsText } = this.state
    if (e.key === 'Tab') {
      this.closeBlockControl()
    } else if (e.key === 'Backspace' && !filterControlsText) {
      this.closeBlockControl()
    }
  }

  onAddClick = (index: number) => {
    ReactTooltip.hide()

    const { blocks } = this.state

    const isEmpty = isBlockEmpty(blocks[index])

    if (isEmpty) {
      const blockRef = this.blockRefs[index]
      this.setState({ filterControlsText: null })
      this.openBlockControl(index)
      const type = blocks[index].type
      if (BlockTypeProperties[type].isEditable) {
        blockRef.focus()
      }
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
    const { blockControlsFocusedIndex: index, filterControlsText } = this.state

    if (index === -1) return

    this.setState((prevState) => {
      const blocks = [...prevState.blocks]
      console.log(filterControlsText)
      if (prevState.filterControlsText) {
        console.log('update block')
        blocks[index] = { ...DEFAULT_BLOCK }
        blocks[index].type = key
      } else {
        console.log('insert new block')
      }

      return {
        ...prevState,
        blocks,
      }
    })

    this.closeBlockControl()
    if (BlockTypeProperties[key].isEditable) {
      this.blockRefs[index].focus()
    }
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
    const { blocks } = this.state
    const type = blocks[index].type
    if (BlockTypeProperties[type].isEditable) {
      this.blockRefs[index - 1].focus()
    }

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

    const titles = Object.values(BlockTypeProperties).filter(
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
    const initialHeight = BlockTypeProperties[block.type].initialHeight
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
      case BlockType.QUOTE:
        const itemText: BlockDataText = item as BlockDataText

        return (
          <Text
            innerRef={refCallback}
            tabIndex={i}
            enableEnterToAdd={!blockControlOpen}
            content={itemText}
            filteringMode={blockControlOpen}
            onAddClick={() => this.onAddClick(i)}
            onNew={() => this.onCreateBlock(i)}
            onUpdate={(arg0) => this.onUpdateBlock(i, arg0)}
            onDelete={() => this.onDeleteBlock(i)}
            onFocus={() => this.onBlockFocus(i)}
            onBlur={() => this.onBlockBlur(i)}
            onCommandUpdate={(value) => this.onCommandUpdate(i, value)}
          />
        )
      case BlockType.IMAGE:
        const content: BlockDataImage = item as BlockDataImage
        return <Image innerRef={refCallback} content={content} />
      case BlockType.DIVIDER:
        return <Divider innerRef={refCallback} />
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
        <Tooltip id={'editor'} />
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
