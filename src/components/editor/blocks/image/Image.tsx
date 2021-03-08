import { memo, useState, useCallback, useEffect } from 'react'
import { BlockDataImage, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { useAsset } from 'components/providers/assets'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import { default as NextImage } from 'next/image'

export const Image = ({ content, onUpdate, id }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [mediaSource, setMediaSource] = useState(content)
  const [progress, setProgress] = useState(0)
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const [deletePending, setDeletePending] = useState(false)
  const { upload, pendingUploads, removePendingUpload } = useAsset()

  const _uploadFile = useCallback(async () => {
    setUploadInProgress(true)
    await upload(pendingUploads[id].file, pendingUploads[id].file.type, (progress) => {
      console.log('progress', progress)
      setProgress(progress)
    }).then((response) => {
      console.log('upload success')    
      setProgress(0)
      if (!response) {
        console.log(`Error`)
      }
      onUpdate({ ...mediaSource, value: response?.key, type: MediaSourceType.UPLOAD })
      setUploadInProgress(false)
      setDeletePending(true)
    })
    
  }, [mediaSource, setMediaSource, upload, pendingUploads, removePendingUpload, setUploadInProgress])

  useEffect(() => {
    // check to see if blockid in pending uploads
    if (pendingUploads[id] && !uploadInProgress) {
      _uploadFile()   
    }
    if(deletePending) {
      setDeletePending(false)
      removePendingUpload(id)
    }
  }, [_uploadFile, pendingUploads, uploadInProgress, removePendingUpload])

  if (!mediaSource.value) {
    return (
      <div>
        <div className={styles.container} onClick={() => setShowSelector(!showSelector)}>
          <ImageIcon className={styles.icon} width={25} height={25} />

          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && (
          <MediaSelector setMediaSource={setMediaSource} mediaSource={mediaSource} />
        )}
      </div>
    )
  }
  let imgSrc
  switch(mediaSource.type) {
    case MediaSourceType.UPLOAD:
      imgSrc = `${process.env.OMNEA_UPLOAD_URL}/${mediaSource.value}`
      break
    case MediaSourceType.LIBRARY:
      imgSrc = mediaSource.value
      break
    default:
      imgSrc = mediaSource.value
  }
  console.log('media source', mediaSource)
  return (
    <div className={styles.imageContainer}>
      <NextImage
        layout="intrinsic"
        width={600}
        height={400}
        objectFit={'contain'}
        src={imgSrc}
      />
      <div className={styles.progress}>{progress}</div>}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
  onUpdate: (value: BlockDataImage) => void
  id: number
}

export default memo(Image)
