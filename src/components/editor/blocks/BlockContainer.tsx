import React from 'react'
import styled from 'styled-components'
import { Point } from 'types'
import { ReactComponent as DragIcon } from 'images/icons/drag.svg'
import { ReactComponent as AddIcon } from 'images/icons/add.svg'
import IconButton from 'components/core/ui/IconButton'
import Colors from 'config/colors'

class BlockContainer extends React.Component<IProps> {
  onBlockDoubleClick = (event: React.MouseEvent) => {
    const { onBlockDoubleClick } = this.props
    if (!onBlockDoubleClick) return

    onBlockDoubleClick({ x: event.clientX, y: event.clientY })
  }

  render() {
    const { children } = this.props
    return (
      <Container onDoubleClick={this.onBlockDoubleClick}>
        <Controls>
          <IconButton style={{ cursor: 'pointer' }}>
            <AddIcon style={{ fill: Colors.controls, width: 16, height: 16 }} />
          </IconButton>
          <IconButton style={{ cursor: 'grab' }}>
            <DragIcon style={{ fill: Colors.controls, width: 14, height: 14 }} />
          </IconButton>
        </Controls>
        {children}
      </Container>
    )
  }
}

interface IProps {
  onBlockDoubleClick?: (pos: Point) => void
}

const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
`

const Controls = styled.div`
  position: absolute;
  left: -45px;
  top: 5px;
  display: flex;
  flex-direction: row;
`

export default BlockContainer
