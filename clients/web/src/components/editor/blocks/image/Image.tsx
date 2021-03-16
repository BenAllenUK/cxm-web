import { memo, useState, useCallback } from 'react'
import { BlockDataImage, BlockData, BlockType } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import MediaControls from 'components/editor/modals/media-controls/'
import AddComment from 'components/editor/modals/media/AddComment'
import TextInput from 'components/common/text-input/TextInput'
import Progress from './Progress'
import ImageComponent from './ImageComponent'

export const Image = ({ content, onUpdate, onImageUpdate, id }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [createComment, setCreateComment] = useState(false)
  const [caption, setCaption] = useState(content.caption || '')
  const [writeNewCaption, setWriteNewCaption] = useState(false)

  const _setShowSelector = useCallback(() => {
    setShowSelector(!showSelector)
  }, [setShowSelector])

  const _writeNewCaption = useCallback(() => {
    setWriteNewCaption(true)
  }, [setWriteNewCaption])

  const _setCreateComment = useCallback(() => {
    setCreateComment(true)
  }, [setCreateComment])

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && <MediaSelector onUpdate={onUpdate} onImageUpdate={onImageUpdate} id={id} />}
      </div>
    )
  }

  // const onSendComment = (comment: string) => {
  //   const commentObj = {
  //     comment: comment,
  //     user: 'G',
  //     time: Date.now().toString(),
  //   }
  //   // onUpdate({ ...content, comments: content.comments.push(commentObj) })
  // }

  const onCaptionChange = useCallback(
    (e: any) => {
      setCaption(e.target.value)
      onUpdate({ ...content, caption: e.target.value }, BlockType.IMAGE)
    },
    [setCaption, onUpdate, content]
  )

  console.log('content', content)
  return (
    <div className={styles.box}>
      <div className={styles.imageContainer}>
        <ImageComponent content={content} id={id} />
        <div className={styles.mediaControls}>
          <MediaControls.Component setWriteNewCaption={_writeNewCaption} setCreateComment={_setCreateComment} />
        </div>
        <Progress id={id} />
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
  onImageUpdate: (value: BlockData, pendingUploadFile: File, createNew?: boolean) => void
  id: number
}

export default memo(Image)
