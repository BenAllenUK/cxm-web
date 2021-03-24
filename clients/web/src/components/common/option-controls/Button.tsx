import Colors from 'config/colors'
import Image from 'next/image'
import { ReactNode, RefObject, useCallback } from 'react'
import styles from './OptionControls.module.scss'

export const Button = ({
  id,
  title,
  subtitle,
  icon,
  hint,
  selected,
  iconClassName,
  onInnerRefCallback,
  onClick,
  onMouseEnter,
  ...otherProps
}: IProps) => {
  const _onClick = useCallback(
    (e) => {
      onClick(id)
      e.stopPropagation()
      e.preventDefault()
    },
    [onClick, id]
  )
  const _onMouseEnter = useCallback(() => {
    onMouseEnter(id)
  }, [onMouseEnter, id])

  const _innerRef = useCallback(
    (ref: HTMLDivElement | undefined | null) => {
      if (!ref) return
      onInnerRefCallback(ref, id)
    },
    [onInnerRefCallback, id]
  )

  return (
    <div
      className={styles.item}
      onMouseDown={_onClick}
      onMouseEnter={_onMouseEnter}
      style={selected ? { backgroundColor: Colors.line } : {}}
      ref={_innerRef}
      {...otherProps}
    >
      {icon && <div className={iconClassName || styles.icon}>{icon}</div>}

      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <div className={styles.hint}>{hint}</div>
    </div>
  )
}

export default Button

interface IProps {
  id: number
  title: string
  selected?: boolean
  icon?: ReactNode
  subtitle?: string
  hint?: string
  iconClassName?: string

  onInnerRefCallback: (ref: HTMLDivElement, id: number) => void
  onClick: (id: number) => void
  onMouseEnter: (id: number) => void
}
