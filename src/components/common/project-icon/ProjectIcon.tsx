import { memo } from 'react'
import styles from './ProjectIcon.module.scss'

const ProjectIcon = ({ name, image, width = 22, height = 22 }: IProps) => {
  if (image) {
    return <img width={width} height={height} src={image} style={{ borderRadius: 5 }} />
  }

  return (
    <div className={styles.titleEmptyLogo} style={{ width, height }}>
      {name.substring(0, 1).toUpperCase()}
    </div>
  )
}

export default memo(ProjectIcon)

interface IProps {
  name: string
  image?: string | null
  width?: number
  height?: number
}
