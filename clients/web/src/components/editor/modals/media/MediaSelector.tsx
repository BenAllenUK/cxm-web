import { memo, useState } from 'react'
import styles from './MediaSelector.module.scss'
import { BlockData, BlockType, MediaSourceType, MediaSourceObject, BlockDataMedia } from '../../blocks/types'
import SourceTabBar from './SourceTabBar'
import Source from './Source'

export const MediaSelector = ({ onMediaUpdate, onUpdate, id, libraries, fileFilter }: IProps) => {
  const [selectedSource, setSelectedSource] = useState<MediaSourceObject>({
    name: MediaSourceType.UPLOAD,
    type: MediaSourceType.UPLOAD,
  })
  const [pictures, setPictures] = useState<[]>([])

  const _selectSource = (item: MediaSourceObject) => {
    setSelectedSource(item)
  }

  const _setPictures = (item: any) => {
    setPictures(item)
  }

  let sources: MediaSourceObject[] = [
    { name: MediaSourceType.UPLOAD, type: MediaSourceType.UPLOAD },
    { name: MediaSourceType.EMBED_LINK, type: MediaSourceType.EMBED_LINK },
  ]
  if (libraries) {
    sources = sources.concat(libraries)
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
          id={id}
          fileFilter={fileFilter}
        />
      </div>
    </div>
  )
}

interface IProps {
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  id: number
  fileFilter?: string
  libraries?: MediaSourceObject[]
}

export default memo(MediaSelector)
