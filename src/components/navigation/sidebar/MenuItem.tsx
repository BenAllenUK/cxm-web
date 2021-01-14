import styles from './Sidebar.module.scss'

import ArrowIcon from 'images/icons/arrow-filled-right.svg'
import PlusIcon from 'images/icons/plus.svg'
import MoreIcon from 'images/icons/more.svg'
import Colors, { hexToRGB } from 'config/colors'
import { CSSProperties } from 'react'

export default function MenuItem({ children, isOpen, subList, innerStyle, onClick }: IProps) {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.itemMain} style={innerStyle}>
        <ArrowButton disable={!subList} isDown={isOpen} />

        <div>{children}</div>
      </div>
      <div className={styles.itemControls}>
        <AddButton />
        <MoreButton />
      </div>
    </div>
  )
}

export function ArrowButton({
  isDown = false,
  disable = false,
}: {
  isDown?: boolean
  disable: boolean
}) {
  return (
    <div
      className={styles.itemControlsButton}
      style={{ marginRight: 4, pointerEvents: disable ? 'none' : 'inherit' }}
    >
      <ArrowIcon
        width={10}
        height={10}
        style={isDown ? { transform: 'rotate(90deg)' } : {}}
        fill={hexToRGB(Colors.text2, 0.7)}
      />
    </div>
  )
}

export function AddButton() {
  return (
    <div
      className={styles.itemControlsButton}
      data-tip={'Quickly add a page inside'}
      data-for="sidebar"
    >
      <PlusIcon fill={Colors.text2} width={12} height={12} />
    </div>
  )
}

export function MoreButton() {
  return (
    <div
      className={styles.itemControlsButton}
      data-tip={'Delete, duplicate and more...'}
      data-for="sidebar"
    >
      <MoreIcon fill={Colors.text2} width={20} height={20} />
    </div>
  )
}

interface IProps {
  children: any
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  subList?: boolean
  isOpen: boolean
  innerStyle: CSSProperties
}
