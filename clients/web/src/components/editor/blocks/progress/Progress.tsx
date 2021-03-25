import { memo } from 'react'
import { useAsset } from 'components/providers/assets'
import styles from './Progress.module.scss'

export const Progress = ({ id, alwaysDisplay }: IProps) => {
  const { pendingUploads } = useAsset()
  const progress = pendingUploads[id]?.progress
  return (
    <div>
      {(progress || alwaysDisplay) && (
        <div className={styles.progress}>
          <div className={styles.ldsRing} /> {Math.round((progress || 0) * 100)}%
        </div>
      )}
    </div>
  )
}

interface IProps {
  id: number
  alwaysDisplay?: boolean
}

export default memo(Progress)
