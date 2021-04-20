import { memo, useState, useCallback, useRef, MouseEvent } from 'react'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import AttachmentIcon from 'images/icons/paperclip.svg'
import MoreIcon from 'images/icons/more.svg'
import Uploading from '../common/Uploading'
import { readableBytes } from 'utils/func/readableBytes'
import styles from './File.module.scss'

import { useMediaControlModal } from 'components/editor/modals/media-controls'

const File = ({ content, onUpdate, id, onMediaUpdate }: IProps) => {
  const { showControls } = useMediaControlModal()

  const ref = useRef<HTMLDivElement>(null)

  const sources: MediaSourceObject[] = [{ name: 'Upload', type: MediaSourceType.UPLOAD }]
  const _onPageControlsClick = (e: MouseEvent) => {
    if (ref.current) {
      const { top: blockTop, left: blockLeft } = ref.current.getBoundingClientRect()
      showControls({
        x: blockLeft,
        y: blockTop + 30,
      })
      e.stopPropagation()
    }
  }
  const [showSelector, setShowSelector] = useState(false)
  const _setShowSelector = useCallback(() => {
    setShowSelector(!showSelector)
  }, [setShowSelector, showSelector])

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <AttachmentIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Upload or embed a file</div>
        </div>
        {showSelector && <MediaSelector onMediaUpdate={onMediaUpdate} onUpdate={onUpdate} sources={sources} />}
      </div>
    )
  }

  if (content.sourceType === MediaSourceType.LOCAL) {
    return <Uploading id={id} content={content.fileName} alwaysDisplay={true} Icon={AttachmentIcon} />
  }

  return (
    <div className={styles.attachmentContainer} onClick={() => open(`${process.env.OMNEA_UPLOAD_URL}/${content.value}`)}>
      <AttachmentIcon className={styles.icon} width={20} height={20} />
      <div style={{ marginLeft: 10 }}>{content.fileName}</div>
      <div className={styles.fileSize}>{content.fileSize && readableBytes(content.fileSize)}</div>
      <div ref={ref} className={styles.more} onClick={_onPageControlsClick}>
        <MoreIcon width={20} height={20} />
      </div>
    </div>
  )
}

export default memo(File)

interface IProps {
  id: number
  content: BlockDataMedia
  onUpdate: (value: BlockData, type?: BlockType) => void
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, type: BlockType, createNew?: boolean) => void
  onDeleteBlock: () => void
}
