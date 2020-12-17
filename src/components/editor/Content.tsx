import React, { RefObject } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { SortableContainer, SortableElement, SortEvent, SortStart } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import styled from 'styled-components'

import Colors from 'config/colors'
import BlockText from './blocks/BlockText'
import TextControls from './text-controls'
import { BlockData, BlockType, BlockDataText } from 'types/editor'

import { IAppState } from 'reducers'
import editor from 'actions/editor'
import { Point } from 'types'
import BlockControls from './block-controls'

class Content extends React.Component<IProps, IState> {
  state = {
    blocks: this.props.blocks,
    sortingIndex: null,
  }

  blockRefs: RefObject<HTMLDivElement>[] = []
  bodyRef?: RefObject<HTMLDivElement>

  constructor(props: IProps) {
    super(props)
  }

  // TODO: Add timer to commit blocks to store

  onAddClick = (index: number) => {
    const { actions } = this.props

    //@ts-ignore
    const { top: blockTop } = this.blockRefs[index].getBoundingClientRect()
    //@ts-ignore
    const { top: bodyTop } = this.bodyRef.getBoundingClientRect()
    const diffTop = blockTop - bodyTop
    actions.editor.blockControlOpen({ x: 300, y: diffTop })
  }

  onBlockClick = (index: number) => {
    const { actions } = this.props
    const { textControlOpen } = this.props
    if (textControlOpen) {
      actions.editor.textControlClose()
    }
  }

  onBlockDoubleClick = (index: number, pos: Point) => {
    const { actions } = this.props
    actions.editor.textControlOpen(pos)
  }

  onCreateBlock = (index: number) => {
    this.setState((state) => {
      const blocks = [...state.blocks]
      blocks.splice(index + 1, 0, {
        type: BlockType.TEXT,
        value: '',
      })

      return {
        ...state,
        blocks,
      }
    })
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
      sortingIndex: null,
    }))
  }

  renderBlock = (item: BlockData, i: number) => {
    return (
      <Item index={i} key={`${i}`}>
        <div
          ref={(ref) => {
            if (!ref) return
            //@ts-ignore
            this.blockRefs[i] = ref
          }}
        >
          {this.renderBlockItem(item, i)}
        </div>
      </Item>
    )
  }

  renderBlockItem = (item: BlockData, i: number) => {
    const { sortingIndex } = this.state
    const sortMode = i === sortingIndex
    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
        const itemText: BlockDataText = item as BlockDataText
        return (
          <BlockText
            sortMode={sortMode}
            content={itemText}
            onAddClick={() => this.onAddClick(i)}
            onNew={() => this.onCreateBlock(i)}
            onUpdate={(arg0) => this.onUpdateBlock(i, arg0)}
            onDelete={() => this.onDeleteBlock(i)}
            onDoubleClick={(pos) => this.onBlockDoubleClick(i, pos)}
            onClick={() => this.onBlockClick(i)}
          />
        )
      default:
        return <div />
    }
  }

  render() {
    const { blocks } = this.state
    const {
      textControlPosition,
      textControlOpen,
      blockControlOpen,
      blockControlPosition,
    } = this.props

    return (
      <Body
        ref={(ref) => {
          if (!ref) return
          // @ts-ignore
          this.bodyRef = ref
        }}
      >
        {textControlOpen && <TextControls position={textControlPosition} />}
        {blockControlOpen && <BlockControls position={blockControlPosition} />}

        <List onSortStart={this.onSortStart} onSortEnd={this.onSortEnd} useDragHandle={true}>
          {blocks.map((item, i) => this.renderBlock(item, i))}
        </List>
      </Body>
    )
  }
}

const Body = styled.div`
  background-color: ${Colors.background};
  width: 100%;
  height: 100vh;
`

const StyledList = styled.div`
  margin: 0 auto;
  margin-top: 100px;
`

const ItemContainer = styled.div``

const List = SortableContainer(StyledList)
const Item = SortableElement(ItemContainer)

interface IProps extends ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps> {
  blocks: BlockData[]
}

interface IState {
  blocks: BlockData[]
  sortingIndex: number | null
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
