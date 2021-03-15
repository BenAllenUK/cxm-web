import { memo, useState, useCallback, useEffect } from 'react'
import { BlockDataImage, BlockData, BlockType, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { useAsset } from 'components/providers/assets'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import MediaControls from 'components/editor/modals/media-controls/'
import AddComment from 'components/editor/modals/media/AddComment'
import { default as NextImage } from 'next/image'
import { Image as CloundinaryImage, CloudinaryContext } from 'cloudinary-react'
import TextInput from 'components/common/text-input/TextInput'

export const Image = ({ content, onUpdate, onImageUpdate, id }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [createComment, setCreateComment] = useState(false)
  const [caption, setCaption] = useState(content.caption || '')
  const [uploadProgress, setUploadProgress] = useState<{ progress: number; uploading: boolean }>({
    progress: 0,
    uploading: false,
  })
  const [writeNewCaption, setWriteNewCaption] = useState(false)
  const { upload, pendingUploads, removePendingUpload } = useAsset()

  const _uploadFile = useCallback(async () => {
    const response = await upload(pendingUploads[id].file, pendingUploads[id].file.type, (progress) => {
      setUploadProgress({ ...uploadProgress, progress: progress })
    })
    removePendingUpload(id)
    setUploadProgress({ uploading: false, progress: 0 })
    if (!response) {
      console.log(`Error Uploading Image`)
      return
    }
    onUpdate({ value: response?.key, type: MediaSourceType.UPLOAD })
  }, [upload, pendingUploads, removePendingUpload, setUploadProgress])

  useEffect(() => {
    if (pendingUploads[id] && !uploadProgress.uploading) {
      console.log('uploading...')
      setUploadProgress({ ...uploadProgress, uploading: true })

      console.log(uploadProgress)
      _uploadFile()
    }
  }, [_uploadFile, pendingUploads, uploadProgress, setUploadProgress])

  const _setShowSelector = () => {
    setShowSelector(!showSelector)
  }

  const _writeNewCaption = () => {
    setWriteNewCaption(true)
  }

  const _setCreateComment = () => {
    setCreateComment(true)
  }

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && <MediaSelector onUpdate={onImageUpdate} />}
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

  const onSendComment = (comment: string) => {
    const commentObj = {
      comment: comment,
      user: 'G',
      time: Date.now().toString(),
    }
    // onUpdate({ ...content, comments: content.comments.push(commentObj) })
  }

  const onCaptionChange = (e: any) => {
    setCaption(e.target.value)
    onUpdate({ ...content, caption: e.target.value }, BlockType.IMAGE)
  }

  return (
    <div className={styles.box}>
      <div className={styles.imageContainer}>
        <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={imgSrc} />
        <div className={styles.mediaControls}>
          <MediaControls.Component setWriteNewCaption={_writeNewCaption} setCreateComment={_setCreateComment} />
        </div>
        {/* {uploadProgress.progress && ( */}
        <div className={styles.progress}>
          <div className={styles.ldsRing} /> {Math.round(uploadProgress.progress * 100)}%
        </div>
        {/* )} */}
      </div>
      <div>
        {(writeNewCaption || caption) && (
          <TextInput
            focusedPlaceholder={'Write a caption...'}
            blurredPlaceholder={'Write a caption...'}
            html={caption}
            onChange={onCaptionChange}
            className={styles.linkInput}
          />
        )}
        {createComment && <AddComment onClick={() => null} />}
      </div>
    </div>
  )
}

interface IProps {
  content: BlockDataImage
  onUpdate: (value: BlockData, type?: BlockType) => void
  onImageUpdate: (value: BlockData, type?: BlockType, pendingUploadFile?: File, createNew?: boolean) => void
  id: number
}

export default memo(Image)
