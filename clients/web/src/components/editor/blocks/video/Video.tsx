import { memo, useState, useCallback } from 'react'
import styles from './Video.module.scss'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import ImageIcon from 'images/icons/image.svg'
import VideoIcon from 'images/icons/video.svg'
import Uploading from '../common/Uploading'
import TopBar from 'components/editor/modals/media-controls/TopBar'
import { BlockDataMedia, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import ReactJWPlayer from 'react-jw-player'

const Video = ({ content, onMediaUpdate, onUpdate, id, onDeleteBlock }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const _setShowSelector = useCallback(() => {
    setShowSelector(!showSelector)
  }, [setShowSelector, showSelector])
  let sources: MediaSourceObject[] = [
    { name: 'Upload', type: MediaSourceType.UPLOAD },
    { name: 'Embed Link', type: MediaSourceType.EMBED_LINK },
  ]

  if (!content.value) {
    return (
      <div>
        <div className={styles.container} onClick={_setShowSelector}>
          <VideoIcon className={styles.icon} width={25} height={25} />
          <div className={styles.text}>Upload or embed a file</div>
        </div>
        {showSelector && (
          <MediaSelector
            isVideo={true}
            onMediaUpdate={onMediaUpdate}
            onUpdate={onUpdate}
            fileFilter={'video/*'}
            sources={sources}
          />
        )}
      </div>
    )
  }

  if (content.sourceType === MediaSourceType.LOCAL) {
    return <Uploading id={id} content={content.value} alwaysDisplay={true} Icon={VideoIcon} />
  }

  const fileUrl =
    content.sourceType === MediaSourceType.EMBED_LINK ? content.value : `${process.env.OMNEA_UPLOAD_URL}/${content.value}`
  return (
    <div className={styles.outerContainer}>
      <div className={styles.videoContainer}>
        <div className={styles.mediaControls}>
          <TopBar onDeleteBlock={onDeleteBlock} setWriteNewCaption={() => null} setCreateComment={() => null} />
        </div>
        <ReactJWPlayer playerId={`editor-${id}`} playerScript="https://cdn.jwplayer.com/libraries/M9UOpPcN.js" file={fileUrl} />
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
  onDeleteBlock: () => void
}
