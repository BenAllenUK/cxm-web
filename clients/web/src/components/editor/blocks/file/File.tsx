import { memo, useState, useCallback, useRef } from 'react'
import FileSelection, { useFileSelectionModal } from 'components/editor/modals/file-selection'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import AttachmentIcon from 'images/icons/paperclip.svg'
import MoreIcon from 'images/icons/more.svg'
import Uploading from '../common/Uploading'
import { readableBytes } from 'utils/func/readableBytes'
import styles from './File.module.scss'
import Button from 'components/common/button/Button'

const File = ({ id, content }: IProps) => {
  const { showControls } = useFileSelectionModal()

  const ref = useRef<HTMLDivElement>(null)

  const sources: MediaSourceObject[] = [{ name: 'Upload', type: MediaSourceType.UPLOAD }]
  const onMoreControlsClick = (e: any) => {
    if (ref.current) {
      const { top: blockTop, left: blockLeft } = ref.current.getBoundingClientRect()
      showControls({
        x: blockLeft,
        y: blockTop + 30,
      })
      e.stopPropagation()
    }
  }

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={() => showControls({ sources, id })}>
          <AttachmentIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Upload or embed a file</div>
        </div>
      </div>
    )
  }

  if (content.sourceType === MediaSourceType.LOCAL) {
    return <Uploading id={id} content={content.fileName} alwaysDisplay={true} Icon={AttachmentIcon} />
  }

  return (
    <div className={styles.attachmentContainer} onClick={() => open(`${process.env.OMNEA_UPLOAD_URL}/${content.value}`)}>
      <AttachmentIcon className={styles.icon} width={18} height={18} />
      <div style={{ marginLeft: 10 }}>{content.fileName}</div>
      <div className={styles.fileSize}>{content.fileSize && readableBytes(content.fileSize)}</div>
      <div style={{ flex: 1 }} />
      <Button ref={ref} onClick={onMoreControlsClick} className={styles.more}>
        <MoreIcon width={20} height={20} />
      </Button>
    </div>
  )
}

export default memo(File)

interface IProps {
  id: number
  content: BlockDataMedia
  onDeleteBlock: () => void
}
