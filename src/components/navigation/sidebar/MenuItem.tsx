import styles from './Sidebar.module.scss'

import ArrowIcon from 'images/icons/arrow-filled-right.svg'
import PlusIcon from 'images/icons/plus.svg'
import MoreIcon from 'images/icons/more.svg'
import Colors, { hexToRGB } from 'config/colors'
import { CSSProperties, HTMLAttributes } from 'react'

export default function MenuItem({
  children,
  isOpen,
  subList,
  innerStyle,
  onClick,
  onAddClick,
  onMoreClick,
}: IProps) {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.itemMain} style={innerStyle}>
        <ArrowButton disable={!subList} isDown={isOpen} />

        <div>{children}</div>
      </div>
      <div className={styles.itemControls}>
        <AddButton onClick={onAddClick} />
        <MoreButton onClick={onMoreClick} />
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

export function AddButton(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={styles.itemControlsButton}
      data-tip={'Quickly add a page inside'}
      data-for="sidebar"
      {...props}
    >
      <PlusIcon fill={Colors.text2} width={12} height={12} />
    </div>
  )
}

export function MoreButton(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={styles.itemControlsButton}
      data-tip={'Delete, duplicate and more...'}
      data-for="sidebar"
      {...props}
    >
      <MoreIcon fill={Colors.text2} width={20} height={20} />
    </div>
  )
}

interface IProps {
  children: any
  subList?: boolean
  isOpen: boolean
  innerStyle: CSSProperties
  onAddClick: (e: React.MouseEvent<HTMLDivElement>) => void
  onMoreClick: (e: React.MouseEvent<HTMLDivElement>) => void
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}
