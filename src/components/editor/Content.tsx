import Colors from 'config/Colors'
import React from 'react'
import styled from 'styled-components'
import BlockText from './blocks/BlockText'
import TextControls from './TextControls'
import { BlockData, BlockType, BlockDataText } from 'types/editor'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { IAppState } from 'reducers'
import editor from 'actions/editor'
import { Point } from 'types'

class Content extends React.Component<IProps, IState> {
  state = {
    blocks: this.props.blocks,
  }

  // TODO: Add timer to commit blocks to store

  onAddBlockPress = () => {}

  onBlockDoubleClick = (index: number, pos: Point) => {
    const { actions } = this.props
    actions.editor.textStyleModalOpen(pos)
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

  renderBlock = (item: BlockData, i: number) => {
    switch (item.type) {
      case BlockType.TEXT:
      case BlockType.H1:
      case BlockType.H2:
      case BlockType.H3:
        const itemtext: BlockDataText = item as BlockDataText
        return (
          <BlockText
            key={`${i}`}
            content={itemtext}
            onUpdate={(arg0) => this.onUpdateBlock(i, arg0)}
            onDelete={() => this.onDeleteBlock(i)}
            onBlockDoubleClick={(pos) => this.onBlockDoubleClick(i, pos)}
          />
        )
    }
  }

  render() {
    const { blocks } = this.state
    const { textStyleSourcePosition, textStyleOpen } = this.props
    return (
      <Body>
        {/* {textStyleOpen && <TextControls position={textStyleSourcePosition} />} */}
        <Form>{blocks.map((item, i) => this.renderBlock(item, i))}</Form>
      </Body>
    )
  }
}

const Body = styled.div`
  background-color: ${Colors.background};
  width: 100%;
  height: 100vh;
`

const Form = styled.div`
  margin: 0 auto;
  max-width: 600px;
  margin-top: 100px;
`

interface IProps extends ReduxProps<typeof mapStateToProps, typeof mapDispatchToProps> {
  blocks: BlockData[]
}

interface IState {
  blocks: BlockData[]
}

function mapStateToProps(state: IAppState) {
  return {
    textStyleOpen: state.editor.textStyleModalOpen,
    textStyleSourcePosition: state.editor.textStyleModalSourcePosition,
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
