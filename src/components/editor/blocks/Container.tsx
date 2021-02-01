import { useCallback, useState, memo, ReactNode } from 'react'
import { useHover, useToggle } from 'utils/hooks'

import { BLOCK_CONTAINER_VERTICAL_PADDING } from '.'

import styles from './Container.module.scss'
import Controls from './Controls'

const Container = ({ index, enableHandle, initialHeight, onDoubleClick, onClick, onAddClick, children }: IProps) => {
  const _onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      onDoubleClick(index, { x: event.clientX, y: event.clientY })
    },
    [index]
  )

  const _onClick = useCallback(() => {
    onClick(index)
  }, [index])

  const _onAddClick = useCallback(() => {
    onAddClick(index)
  }, [index])

  const [hoverRef, isHovered] = useHover<HTMLDivElement>()

  const isVisible = enableHandle && isHovered
  return (
    <div ref={hoverRef}>
      <div
        className={styles.block}
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
        onClick={_onClick}
        onDoubleClick={_onDoubleClick}
      >
        <Controls initialHeight={initialHeight} isVisible={isVisible} onAddClick={_onAddClick} />
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
}

interface IState {
  showControls: boolean
}

export default memo(Container)
