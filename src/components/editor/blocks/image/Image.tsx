import { memo } from 'react'
import { BlockDataImage } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { default as NextImage } from 'next/image'

export const Image = ({ content }: IProps) => {
  if (!content.source) {
    return (
      <div className={styles.container}>
        <ImageIcon className={styles.icon} width={25} height={25} />

        <div className={styles.text}>Add an image</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={content.source} />
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}

export default memo(Image)
