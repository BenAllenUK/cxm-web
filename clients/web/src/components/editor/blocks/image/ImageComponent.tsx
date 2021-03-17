import { memo } from 'react'
import { BlockDataImage, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import { default as NextImage } from 'next/image'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react'

export const ImageComponent = ({ content, id }: IProps) => {
  let imgSrc
  switch (content.type) {
    case MediaSourceType.UPLOAD:
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`

      break
    case MediaSourceType.LIBRARY:
      imgSrc = content.value || ''
      break
    case MediaSourceType.CLOUDINARY:
      return (
        <div className={styles.imageContainer}>
          <CloudinaryContext cloudName={'dbiqces70'}>
            <CloudinaryImage className={styles.image} publicId={content.value} key={content.value} />
          </CloudinaryContext>
        </div>
      )
    default:
      imgSrc = content.value || ''
  }

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
function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.content.type === MediaSourceType.LOCAL && nextProps.content.type === MediaSourceType.UPLOAD
}
export default memo(ImageComponent, areEqual)
