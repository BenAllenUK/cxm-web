import { useCallback, useState, memo, ReactNode } from 'react'
import Button from 'components/common/Button'
import AddIcon from 'images/icons/add.svg'
import DragIcon from 'images/icons/drag.svg'

import styles from './Container.module.scss'
import { SortableHandle } from 'react-sortable-hoc'

const AddButton = memo((props: React.HTMLAttributes<HTMLDivElement>) => (
  <Button className={styles.addButton} {...props}>
    <AddIcon className={styles.add} width={16} height={16} />
  </Button>
))

const DragButton = memo(
  SortableHandle(() => (
    <Button className={styles.grabButton}>
      <DragIcon className={styles.add} width={16} height={16} />
    </Button>
  ))
)

const Controls = ({ initialHeight, isVisible, onAddClick }: IProps) => {
  return (
    <div className={styles.controls} style={{ height: initialHeight, visibility: isVisible ? 'visible' : 'hidden' }}>
      <AddButton data-tip={'Click to add a block below'} data-for="editor" onClick={onAddClick} />
      <DragButton />
    </div>
  )
}

interface IProps {
  initialHeight: number
  isVisible?: boolean
  onAddClick: () => void
}

export default memo(Controls)
