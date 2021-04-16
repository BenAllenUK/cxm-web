import { ReactNode } from 'react'
import styles from './FileControlsUncontrolled.module.scss'

const Option = ({ option, icon, onClick }: IProps) => {
  const node = option ? option : icon
  return (
    <div className={option ? styles.option : styles.icon} onClick={onClick}>
      {node}
    </div>
  )
}

interface IProps {
  icon?: ReactNode
  option?: string
  onClick?: any
}

export default Option
