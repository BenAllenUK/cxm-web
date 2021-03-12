import { memo, useState, useCallback, useEffect } from 'react'
import { BlockDataImage, BlockData, BlockType, MediaSourceType } from '../types'
import styles from './Image.module.scss'
import useHover from 'utils/hooks/useHover'
import ImageIcon from 'images/icons/image.svg'
import { useAsset } from 'components/providers/assets'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import MediaControls from 'components/editor/modals/media-controls/'
import AddComment from 'components/editor/modals/media/AddComment'
import { default as NextImage } from 'next/image'
import { Image as CloundinaryImage, CloudinaryContext } from 'cloudinary-react'
import TextInput from 'components/common/text-input/TextInput'

export const Image = ({ content, onUpdate, id }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [createComment, setCreateComment] = useState(false)
  const [caption, setCaption] = useState(content.caption || '')
  const [progress, setProgress] = useState<null | number>(null)
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const [writeNewCaption, setWriteNewCaption] = useState(false)
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [absoluteHoverRef, isAbsoluteHovered] = useHover<HTMLDivElement>()
  const [displayControls, setDisplayControls] = useState(false)
  const { upload, pendingUploads, removePendingUpload } = useAsset()

  const _uploadFile = useCallback(async () => {
    setUploadInProgress(true)
    const response = await upload(pendingUploads[id].file, pendingUploads[id].file.type, (progress) => {
      setProgress(progress)
    })
    removePendingUpload(id)
    setUploadInProgress(false)
    setProgress(null)
    if (!response) {
      console.log(`Error Uploading Image`)
      return
    }
    onUpdate({ value: response?.key, type: MediaSourceType.UPLOAD })
  }, [upload, pendingUploads, removePendingUpload, setUploadInProgress, setProgress])

  useEffect(() => {
    if (pendingUploads[id] && !uploadInProgress) {
      _uploadFile()
    }
  }, [_uploadFile, pendingUploads, uploadInProgress])

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

  const onSendComment = (comment: string) => {
    const commentObj = {
      comment: comment,
      user: 'G',
      time: Date.now().toString(),
    }
    onUpdate({ ...content, comments: content.comments.push(commentObj) })
  }

  const onCaptionChange = (e: any) => {
    setCaption(e.target.value)
    onUpdate({ ...content, caption: e.target.value }, BlockType.IMAGE)
  }

  if ((isHovered || isAbsoluteHovered) && !displayControls) {
    setDisplayControls(true)
  } else if (!isHovered && !isAbsoluteHovered && displayControls) {
    setTimeout(() => {
      setDisplayControls(false)
    }, 100)
  }

  return (
    <div className={styles.box}>
      <div className={styles.imageContainer} ref={hoverRef}>
        <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={imgSrc} />
        {displayControls && (
          <MediaControls.Component
            hoverRef={absoluteHoverRef}
            setWriteNewCaption={_writeNewCaption}
            setCreateComment={_setCreateComment}
          />
        )}
        {progress && (
          <div className={styles.progress}>
            <div className={styles.ldsRing} /> {Math.round(progress * 100)}%
          </div>
        )}
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
  onUpdate: (value: BlockData, type?: BlockType, pendingUploadFile?: File, createNew?: boolean) => void
  id: number
}

export default memo(Image)
