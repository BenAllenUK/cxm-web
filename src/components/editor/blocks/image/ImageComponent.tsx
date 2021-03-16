import { memo, useState, useCallback } from 'react'
import { BlockDataImage, BlockData, BlockType, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import { default as NextImage } from 'next/image'
import { Image as CloundinaryImage, CloudinaryContext } from 'cloudinary-react'

export const ImageComponent = ({ content, id }: IProps) => {
  let imgSrc
  switch (content.type) {
    case MediaSourceType.UPLOAD:
      if (typeof window !== 'undefined') {
        var img = document.createElement('img')
        console.log('wtf')
      }
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
      break
    case MediaSourceType.LIBRARY:
      imgSrc = content.value
      break
    case MediaSourceType.CLOUDINARY:
      return (
        <div className={styles.imageContainer}>
          <CloudinaryContext cloudName={'dbiqces70'}>
            <CloundinaryImage className={styles.image} publicId={content.value} key={content.value} />
          </CloudinaryContext>
        </div>
      )
    default:
      imgSrc = content.value
  }

  console.log('content', content)
  return (
    <div>
      <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={imgSrc} />
    </div>
  )
}

interface IProps {
  content: BlockDataImage
  id: number
}

export default memo(ImageComponent)
