import Colors from 'config/colors'
import Image from 'next/image'
import { ReactNode, useCallback } from 'react'
import styles from './OptionControls.module.scss'

export const Button = ({
  id,
  title,
  subtitle,
  icon,
  hint,
  selected,
  iconClassName,
  innerRef,
  onClick,
  onMouseEnter,
  ...otherProps
}: IProps) => {
  const _onClick = useCallback(() => {
    onClick(id)
  }, [id])
  const _onMouseEnter = useCallback(() => {
    onMouseEnter(id)
  }, [id])

  return (
    <div
      className={styles.item}
      onClick={_onClick}
      onMouseEnter={_onMouseEnter}
      style={selected ? { backgroundColor: Colors.line } : {}}
      ref={innerRef}
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
  innerRef: any
  title: string
  selected?: boolean
  icon?: ReactNode
  subtitle?: string
  hint?: string
  iconClassName?: string

  onClick: (id: number) => void
  onMouseEnter: (id: number) => void
}
