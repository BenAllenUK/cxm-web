import { memo, useState, useCallback } from 'react'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import { useAsset } from 'components/providers/assets'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import FileSelection, { useFileSelectionModal } from 'components/editor/modals/file-selection'
import TopBar from 'components/editor/modals/file-controls/FileControlsUncontrolled'
import TextInput from 'components/common/text-input/TextInput'
import Progress from '../progress/Progress'
import ImageComponent from './ImageComponent'

export const Image = ({ id, content, onUpdate, onDeleteBlock }: IProps) => {
  const [caption, setCaption] = useState(content.caption || '')
  const [shouldWriteNewCaption, onWriteNewCaption] = useState(false)

  const { localImages } = useAsset()
  const { showControls, ref } = useFileSelectionModal()

  const sources: MediaSourceObject[] = [
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

  const _onWriteNewCaption = useCallback(() => {
    onWriteNewCaption(true)
  }, [onWriteNewCaption])

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
        <div className={styles.container} onClick={() => showControls({ id, sources })}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Add an image</div>
        </div>
        <div ref={ref}></div>
      </div>
    )
  }

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
          <TopBar onDeleteBlock={onDeleteBlock} onWriteNewCaption={_onWriteNewCaption} />
        </div>
        <Progress id={id} />
      </div>
      <div>
        {(shouldWriteNewCaption || caption) && (
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
      </div>
    </div>
  )
}

interface IProps {
  id: number
  content: BlockDataMedia
  onUpdate: (value: BlockData, type?: BlockType) => void
  onDeleteBlock: () => void
}

export default memo(Image)
