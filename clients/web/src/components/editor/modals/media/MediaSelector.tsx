import { memo, useState } from 'react'
import styles from './MediaSelector.module.scss'
import { BlockData, BlockType, MediaSourceType, MediaSourceObject, BlockDataMedia } from '../../blocks/types'
import SourceTabBar from './SourceTabBar'
import Source from './Source'

export const MediaSelector = ({ onMediaUpdate, onUpdate, sources, fileFilter, isVideo, isButton }: IProps) => {
  const [selectedSource, setSelectedSource] = useState<MediaSourceObject>({
    name: isButton ? 'Embed Link' : 'Upload',
    type: isButton ? MediaSourceType.EMBED_LINK : MediaSourceType.UPLOAD,
  })
  const [pictures, setPictures] = useState<[]>([])

  const _selectSource = (item: MediaSourceObject) => {
    setSelectedSource(item)
  }

  const _setPictures = (item: any) => {
    setPictures(item)
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SourceTabBar sources={sources} selectSource={_selectSource} selected={selectedSource.name} setPictures={_setPictures} />
        <Source
          selected={selectedSource}
          onUpdate={onUpdate}
          onMediaUpdate={onMediaUpdate}
          pictures={pictures}
          setPictures={setPictures}
          fileFilter={fileFilter}
          isVideo={isVideo}
          isButton={isButton}
        />
      </div>
    </div>
  )
}

interface IProps {
  sources: MediaSourceObject[]
  onMediaUpdate?: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  isButton?: boolean
  fileFilter?: string
  isVideo?: boolean
}

export default memo(MediaSelector)
