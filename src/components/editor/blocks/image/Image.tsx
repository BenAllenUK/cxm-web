import { memo, useState, useCallback, useEffect } from 'react'
import { BlockDataImage, BlockData, BlockType, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { useAsset } from 'components/providers/assets'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import { default as NextImage } from 'next/image'
import Loader from 'react-loader-spinner'
import { Image as CloundinaryImage, CloudinaryContext } from 'cloudinary-react'

export const Image = ({ content, onUpdate, id }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [progress, setProgress] = useState<null | number>(0)
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const { upload, pendingUploads, removePendingUpload } = useAsset()

  const _uploadFile = useCallback(async () => {
    setUploadInProgress(true)
    await upload(pendingUploads[id].file, pendingUploads[id].file.type, (progress) => {
      setProgress(progress)
    }).then((response) => {
      removePendingUpload(id)
      setUploadInProgress(false)
      setProgress(null)
      if (!response) {
        console.log(`Error Uploading Image`)
        return
      }
      onUpdate({ value: response?.key, type: MediaSourceType.UPLOAD })
    })
  }, [upload, pendingUploads, removePendingUpload, setUploadInProgress, setProgress])

  useEffect(() => {
    if (pendingUploads[id] && !uploadInProgress) {
      _uploadFile()
    }
  }, [_uploadFile, pendingUploads, uploadInProgress])

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={() => setShowSelector(!showSelector)}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && <MediaSelector onUpdate={onUpdate} />}
      </div>
    )
  }
  let imgSrc
  switch (content.type) {
    case MediaSourceType.UPLOAD:
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

  return (
    <div className={styles.imageContainer}>
      <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={imgSrc} />
      {progress ? (
        <div
          // TBD: why doesn't className style work the same for this?
          style={{
            position: 'absolute',
            bottom: 3,
            left: 290,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'black',
            alignItems: 'center',
            color: 'white',
            height: 20,
          }}
        >
          <Loader type="TailSpin" color="#ffffff" height={15} width={15} />
          <div style={{ padding: 5 }}>{Math.round(progress * 100)}%</div>
        </div>
      ) : null}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
  onUpdate: (value: BlockData, type?: BlockType, pendingUploadFile?: File, createNew?: boolean) => void
  id: number
}

export default memo(Image)
