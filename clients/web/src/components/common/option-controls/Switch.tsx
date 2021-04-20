import Colors from 'config/colors'
import { ReactNode, useCallback } from 'react'
import styles from './OptionControls.module.scss'
import MUISwitch from '@material-ui/core/Switch'

export const Switch = ({ id, title, subtitle, state, icon, selected, onClick, onMouseEnter, ...otherProps }: IProps) => {
  const _onClick = useCallback(() => {
    onClick(id)
  }, [onClick, id])
  const _onMouseEnter = useCallback(() => {
    onMouseEnter(id)
  }, [onMouseEnter, id])

  return (
    <div
      className={styles.item}
      onClick={_onClick}
      onMouseEnter={_onMouseEnter}
      style={selected ? { backgroundColor: Colors.line } : {}}
      {...otherProps}
    >
      {icon}

      <div className={styles.description}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      <MUISwitch size="small" />
    </div>
  )
}

export default Switch

interface IProps {
  id: number
  title: string
  selected?: boolean
  icon?: ReactNode
  subtitle?: string
  state?: boolean

  onClick: (id: number) => void
  onMouseEnter: (id: number) => void
}
