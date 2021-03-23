import { memo, useState, useCallback } from 'react'
import styles from './Video.module.scss'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import ImageIcon from 'images/icons/image.svg'
import VideoIcon from 'images/icons/video.svg'
import Uploading from '../common/Uploading'
import TopBar from 'components/editor/modals/media-controls/TopBar'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType } from '../types'

const Video = ({ content, onMediaUpdate, onUpdate, id, deleteBlock }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const _setShowSelector = useCallback(() => {
    setShowSelector(!showSelector)
  }, [setShowSelector])
  console.log('video content', content)
  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <ImageIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Upload or embed a file</div>
        </div>
        {showSelector && <MediaSelector onMediaUpdate={onMediaUpdate} onUpdate={onUpdate} id={id} fileFilter={'video/*'} />}
      </div>
    )
  }

  if (content.sourceType === MediaSourceType.LOCAL) {
    return <Uploading id={id} content={content.value} alwaysDisplay={true} Icon={VideoIcon} />
  }
  console.log(`${process.env.OMNEA_UPLOAD_URL}/${content.value}`)
  return (
    <div className={styles.outerContainer}>
      <div className={styles.videoContainer}>
        <div className={styles.mediaControls}>
          <TopBar deleteBlock={deleteBlock} setWriteNewCaption={() => null} setCreateComment={() => null} />
        </div>
        <video width="320" height="240" controls>
          <source src={`${process.env.OMNEA_UPLOAD_URL}/${content.value}`} type="video/mp4"></source>
        </video>
      </div>
    </div>
  )
}

export default memo(Video)

interface IProps {
  id: number
  content: BlockDataMedia
  onUpdate: (value: BlockData, type?: BlockType) => void
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, type: BlockType, createNew?: boolean) => void
  deleteBlock: () => void
}
