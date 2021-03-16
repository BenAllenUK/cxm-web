import { useCallback, useState, memo, ReactNode } from 'react'
import Button from 'components/common/button/Button'
import AddIcon from 'images/icons/add.svg'
import DragIcon from 'images/icons/drag.svg'

import styles from './Container.module.scss'
import { SortableHandle } from 'react-sortable-hoc'

const AddButton = memo((props: React.HTMLAttributes<HTMLDivElement>) => (
  <Button className={styles.addButton} {...props}>
    <AddIcon className={styles.add} width={14} height={14} />
  </Button>
))

const DragButton = memo(
  SortableHandle(() => (
    <Button className={styles.grabButton}>
      <DragIcon className={styles.add} width={14} height={14} />
    </Button>
  ))
)

const Controls = ({ initialHeight, visible, onAddClick }: IProps) => {
  return (
    <div className={styles.controls} style={{ height: initialHeight, visibility: visible ? 'visible' : 'hidden' }}>
      <div className={styles.controlsInner}>
        <AddButton data-tip={'Click to add a block below'} data-for="editor" onClick={onAddClick} />
        <DragButton />
      </div>
    </div>
  )
}

interface IProps {
  initialHeight: number
  visible?: boolean
  onAddClick: () => void
}

export default memo(Controls)
