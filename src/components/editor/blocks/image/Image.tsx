import { memo, useState } from 'react'
import { BlockDataImage } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import { default as NextImage } from 'next/image'

export const Image = ({ content }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [mediaSource, setMediaSource] = useState(content.source)
  if (!mediaSource) {
    return (
      <div>
        <div className={styles.container} onClick={() => setShowSelector(!showSelector)}>
          <ImageIcon className={styles.icon} width={25} height={25} />

          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && <MediaSelector setMediaSource={setMediaSource} />}
      </div>
    )
  }

  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={mediaSource} />
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}

export default memo(Image)
