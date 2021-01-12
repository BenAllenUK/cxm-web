import React from 'react'

import IconButton from 'components/common/IconButton'

import { SortableHandle } from 'react-sortable-hoc'
import { BLOCK_CONTAINER_VERTICAL_PADDING } from '.'

import AddIcon from 'images/icons/add.svg'
import DragIcon from 'images/icons/drag.svg'

import styles from './Container.module.scss'

const AddButton = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <IconButton style={{ cursor: 'pointer', height: 16 }} {...props}>
    <AddIcon className={styles.add} width={16} height={16} />
  </IconButton>
)

const DragButton = SortableHandle(() => (
  <IconButton style={{ cursor: 'grab', height: 16 }}>
    <DragIcon className={styles.add} width={16} height={16} />
  </IconButton>
))

class Container extends React.Component<IProps, IState> {
  state = {
    showControls: false,
  }

  onDoubleClick = (event: React.MouseEvent) => {
    const { onDoubleClick } = this.props
    onDoubleClick({ x: event.clientX, y: event.clientY })
  }

  onClick = () => {
    const { onClick } = this.props
    onClick()
  }

  onMouseEnter = () => {
    this.setState({ showControls: true })
  }

  onMouseLeave = () => {
    this.setState({ showControls: false })
  }

  render() {
    const { children, onAddClick, initialHeight, enableHandle } = this.props
    const { showControls } = this.state
    const isVisible = enableHandle && showControls
    return (
      <div
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        <div className={styles.block}>
          <div
            className={styles.controls}
            style={{ height: initialHeight, visibility: isVisible ? 'visible' : 'hidden' }}
          >
            <AddButton
              data-tip={'Click to add a block below'}
              data-for="editor"
              onClick={onAddClick}
            />
            <DragButton />
          </div>

          {children}
        </div>
      </div>
    )
  }
}

interface IProps {
  initialHeight: number
  onClick: () => void
  onDoubleClick: (pos: { x: number; y: number }) => void
  enableHandle?: boolean
  onAddClick: () => void
}

interface IState {
  showControls: boolean
}

export default Container
