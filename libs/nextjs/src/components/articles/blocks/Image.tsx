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
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
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
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
  }

  return (
    <div className={'omnea-content-image-container'}>
      <div className={'omnea-content-image'}>
        {value && <NextImage layout='fill' objectFit='fill' src={imgSrc} />}
      </div>
      {content.caption && (
        <div className={'omnea-content-caption'}>{content.caption}</div>
      )}
    </div>
  )
}

interface IProps {
  content: BlockDataMedia
}
