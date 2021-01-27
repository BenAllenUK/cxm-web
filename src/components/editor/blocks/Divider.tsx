import { memo } from 'react'
import styles from './Divider.module.scss'

const Divider = (_: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.divide}></div>
    </div>
  )
}

interface IProps {}

export default memo(Divider)
