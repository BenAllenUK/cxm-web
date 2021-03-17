import { memo } from 'react'
import { useAsset } from 'components/providers/assets'
import styles from './Image.module.scss'

export const Progress = ({ id }: IProps) => {
  const { pendingUploads } = useAsset()
  const progress = pendingUploads[id]?.progress

  return (
    <div>
      {progress && (
        <div className={styles.progress}>
          <div className={styles.ldsRing} /> {Math.round(progress * 100)}%
        </div>
      )}
    </div>
  )
}

interface IProps {
  id: number
}

export default memo(Progress)
