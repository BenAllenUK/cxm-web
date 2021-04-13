import { memo, useState, useCallback, useRef } from 'react'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import { useAsset } from 'components/providers/assets'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import TopBar from 'components/editor/modals/media-controls/TopBar'
import AddComment from 'components/editor/modals/media/AddComment'
import TextInput from 'components/common/text-input/TextInput'
import Progress from '../progress/Progress'
import ImageComponent from './ImageComponent'

export const Image = ({ content, onUpdate, onMediaUpdate, id, onDeleteBlock }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [createComment, setCreateComment] = useState(false)
  const [caption, setCaption] = useState(content.caption || '')
  const [writeNewCaption, setWriteNewCaption] = useState(false)
  const { localImages } = useAsset()
  let sources: MediaSourceObject[] = [
    { name: 'Upload', type: MediaSourceType.UPLOAD },
    { name: 'Embed Link', type: MediaSourceType.EMBED_LINK },
    {
      name: 'Unsplash',
      accessKey: 'QI73_yAqSaRCT6cz2cpM7HQ-ZXoQNV5eYmrbY7E4vD0',
      secretKey: 'aLYW8hiVPn1UGubp3NrHLIgu91LhGfxysWvLKgrIppo',
      type: MediaSourceType.LIBRARY,
    },
    {
      name: 'Cloudinary',
      accessKey: '',
      secretKey: '',
      type: MediaSourceType.CLOUDINARY,
    },
  ]

  const _setShowSelector = useCallback(() => {
    setShowSelector(!showSelector)
  }, [setShowSelector, showSelector])

  const _writeNewCaption = useCallback(() => {
    setWriteNewCaption(true)
  }, [setWriteNewCaption])

  const _setCreateComment = useCallback(() => {
    setCreateComment(true)
  }, [setCreateComment])

  const onCaptionChange = useCallback(
    (e: any) => {
      setCaption(e.target.value)
      onUpdate({ ...content, caption: e.target.value }, BlockType.IMAGE)
    },
    [setCaption, onUpdate, content]
  )

  if (!content.value && !localImages[id]) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && (
          <MediaSelector onUpdate={onUpdate} onMediaUpdate={onMediaUpdate} sources={sources} fileFilter={'image/*'} />
        )}
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

  return (
    <div className={styles.box}>
      <div className={styles.imageContainer}>
        <ImageComponent
          content={
            content.sourceType === MediaSourceType.LOCAL
              ? { value: localImages[id], sourceType: MediaSourceType.LOCAL, fileName: null, fileSize: null }
              : content
          }
          id={id}
        />
        <div className={styles.mediaControls}>
          <TopBar onDeleteBlock={onDeleteBlock} setWriteNewCaption={_writeNewCaption} setCreateComment={() => null} />
        </div>
        <Progress id={id} />
      </div>
      <div>
        {(writeNewCaption || caption) && (
          <div>
            <TextInput
              focusedPlaceholder={'Write a caption...'}
              blurredPlaceholder={'Write a caption...'}
              html={caption}
              onChange={onCaptionChange}
              className={styles.linkInput}
              useInnerText
            />
          </div>
        )}
        {createComment && <AddComment onClick={() => null} />}
      </div>
    </div>
  )
}

interface IProps {
  content: BlockDataMedia
  onUpdate: (value: BlockData, type?: BlockType) => void
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onDeleteBlock: () => void
  id: number
}

export default memo(Image)
