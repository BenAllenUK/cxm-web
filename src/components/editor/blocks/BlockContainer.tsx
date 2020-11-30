import React from 'react'
import styled from 'styled-components'
import { Point } from 'types'

class BlockContainer extends React.Component<IProps> {
  onBlockDoubleClick = (event: React.MouseEvent) => {
    const { onBlockDoubleClick } = this.props
    if (!onBlockDoubleClick) return

    onBlockDoubleClick({ x: event.clientX, y: event.clientY })
  }

  render() {
    const { children } = this.props
    return <Container onDoubleClick={this.onBlockDoubleClick}>{children}</Container>
  }
}

interface IProps {
  onBlockDoubleClick?: (pos: Point) => void
}

const Container = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

export default BlockContainer
