import { useCallback, useState, memo, ReactNode } from 'react'
import { useHover, useToggle } from 'utils/hooks'

import { BLOCK_CONTAINER_VERTICAL_PADDING } from '..'

import styles from './Container.module.scss'
import Controls from './Controls'

const Container = ({ index, enableHandle, initialHeight, onDoubleClick, onClick, onAddClick, children, onDrop }: IProps) => {
  const _onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      onDoubleClick(index, { x: event.clientX, y: event.clientY })
    },
    [onDoubleClick, index]
  )

  const _onClick = useCallback(() => {
    onClick(index)
  }, [onClick, index])

  const _onAddClick = useCallback(() => {
    onAddClick(index)
  }, [onAddClick, index])

  const _onDrop = useCallback(
    (event: any) => {
      onDrop(event, index)
    },
    [onDrop, index]
  )

  const dragOver = () => {}

  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [activeDropzone, setActiveDropzone] = useState(false)
  const isVisible = enableHandle && isHovered
  return (
    <div ref={hoverRef}>
      <div
        onDragOver={() => setActiveDropzone(true)}
        onDragLeaveCapture={() => setActiveDropzone(false)}
        className={activeDropzone ? styles.dropzoneBlock : styles.block}
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
        onClick={_onClick}
        onDoubleClick={_onDoubleClick}
        onDrop={(e) => _onDrop(e)}
      >
        <Controls initialHeight={initialHeight} visible={isVisible} onAddClick={_onAddClick} />
        {children}
      </div>
    </div>
  )
}

interface IProps {
  children: ReactNode
  index: number
  initialHeight: number
  onClick: (index: number) => void
  onDoubleClick: (index: number, pos: { x: number; y: number }) => void
  enableHandle?: boolean
  onAddClick: (index: number) => void
  onDrop: (event: any, index: number) => void
}

export default memo(Container)
