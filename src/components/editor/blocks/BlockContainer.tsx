import React, { RefObject } from 'react'
import styled from 'styled-components'
import { Point } from 'types'
import { ReactComponent as DragIcon } from 'images/icons/drag.svg'
import { ReactComponent as AddIcon } from 'images/icons/add.svg'
import IconButton from 'components/core/ui/IconButton'
import Colors from 'config/colors'
import { SortableHandle } from 'react-sortable-hoc'
import { BLOCK_CONTAINER_VERTICAL_PADDING } from '.'

const AddButton = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <IconButton style={{ cursor: 'pointer', height: 16 }} {...props}>
    <AddIcon style={{ fill: Colors.controls, width: 16, height: 16 }} />
  </IconButton>
)

const DragButton = SortableHandle(() => (
  <IconButton style={{ cursor: 'grab', height: 16 }}>
    <DragIcon style={{ fill: Colors.controls, width: 14, height: 14 }} />
  </IconButton>
))

class BlockContainer extends React.Component<IProps> {
  onDoubleClick = (event: React.MouseEvent) => {
    const { onDoubleClick } = this.props
    onDoubleClick({ x: event.clientX, y: event.clientY })
  }

  onClick = () => {
    const { onClick } = this.props

    onClick()
  }

  render() {
    const { children, onAddClick, initialHeight, enableHandle } = this.props
    return (
      <Container onClick={this.onClick} onDoubleClick={this.onDoubleClick}>
        <Block>
          {enableHandle && (
            <Controls className="block-container-controls" style={{ height: initialHeight }}>
              <AddButton
                data-tip={'Click to add a block below'}
                data-for="editor"
                onClick={onAddClick}
              />
              <DragButton />
            </Controls>
          )}
          {children}
        </Block>
      </Container>
    )
  }
}

interface IProps {
  initialHeight: number
  onClick: () => void
  onDoubleClick: (pos: Point) => void
  enableHandle?: boolean
  onAddClick: () => void
}

const Container = styled.div`
  margin-top: ${BLOCK_CONTAINER_VERTICAL_PADDING}px;
  margin-bottom: ${BLOCK_CONTAINER_VERTICAL_PADDING}px;

  :hover .block-container-controls {
    visibility: visible;
  }
`

const Block = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`

const Controls = styled.div`
  position: absolute;
  left: -45px;
  top: 0px;
  display: flex;
  flex-direction: row;
  visibility: hidden;
  align-items: center;
`

export default BlockContainer
