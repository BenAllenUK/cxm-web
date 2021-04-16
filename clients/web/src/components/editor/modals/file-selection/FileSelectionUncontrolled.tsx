import { memo, useState } from 'react'
import styles from './FileSelectionUncontrolled.module.scss'
import { BlockData, BlockType, MediaSourceType, MediaSourceObject, BlockDataMedia } from '../../blocks/types'
import SourceTabBar from './SourceTabBar'
import Source from './Source'

export const FileSelectionUncontrolled = ({ onMediaUpdate, onUpdate, sources, fileFilter, isVideo }: IProps) => {
  const [selectedSource, setSelectedSource] = useState<MediaSourceObject>({
    name: 'Upload',
    type: MediaSourceType.UPLOAD,
  })
  const [pictures, onSetPictures] = useState<[]>([])

  const _onSelectSource = (item: MediaSourceObject) => {
    setSelectedSource(item)
  }

  const _onSetPictures = (item: any) => {
    onSetPictures(item)
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SourceTabBar
          sources={sources}
          onSelectSource={_onSelectSource}
          selected={selectedSource.name}
          onSetPictures={_onSetPictures}
        />
        <Source
          selected={selectedSource}
          onUpdate={onUpdate}
          onMediaUpdate={onMediaUpdate}
          pictures={pictures}
          onSetPictures={onSetPictures}
          fileFilter={fileFilter}
          isVideo={isVideo}
        />
      </div>
    </div>
  )
}

interface IProps {
  sources: MediaSourceObject[]
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  fileFilter?: string
  isVideo?: boolean
}

export type IFileSelectionUncontrolledProps = IProps

export default memo(FileSelectionUncontrolled)
