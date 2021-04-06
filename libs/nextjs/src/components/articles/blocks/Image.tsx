import { BlockDataMedia, MediaSourceType } from '../../../types'
import { default as NextImage } from 'next/image'
import { Image as CloundinaryImage, CloudinaryContext } from 'cloudinary-react'
import './Image.scss'

export default function Image({ content }: IProps) {
  const { value } = content
  if (!value) return <div />
  let imgSrc = ''

  switch (content.sourceType) {
    case MediaSourceType.UPLOAD:
      imgSrc = `https://omnea-upload.s3.amazonaws.com//${content.value}`
      break
    case MediaSourceType.LIBRARY:
    case MediaSourceType.EMBED_LINK:
      imgSrc = content.value || ''
      break
    case MediaSourceType.CLOUDINARY:
      return (
        <div className={'omnea-content-image-container'}>
          <CloudinaryContext cloudName={'dbiqces70'}>
            <CloundinaryImage
              className={'omnea-content-image-fit '}
              publicId={content.value}
              key={content.value}
            />
          </CloudinaryContext>
        </div>
      )
    default:
      imgSrc = `https://omnea-upload.s3.amazonaws.com/${content.value}`
  }

  return (
    <div className={'omnea-content-image'}>
      {value && (
        <NextImage
          layout='intrinsic'
          width={600}
          height={400}
          objectFit={'contain'}
          src={imgSrc}
        />
      )}
    </div>
  )
}

interface IProps {
  content: BlockDataMedia
}
