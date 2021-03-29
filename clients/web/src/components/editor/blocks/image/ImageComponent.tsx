import { memo } from 'react'
import { BlockDataMedia, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import { default as NextImage } from 'next/image'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react'

export const ImageComponent = ({ content, id }: IProps) => {
  let imgSrc
  switch (content.sourceType) {
    case MediaSourceType.UPLOAD:
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
      break
    case MediaSourceType.LOCAL:
      imgSrc = content.value
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
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
  }
  return <div>{imgSrc && <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={imgSrc} />}</div>
}

interface IProps {
  content: BlockDataMedia
  id: number
}
function areEqual(prevProps: IProps, nextProps: IProps) {
  return prevProps.content.sourceType === MediaSourceType.LOCAL && nextProps.content.sourceType === MediaSourceType.UPLOAD
}
export default memo(ImageComponent, areEqual)
