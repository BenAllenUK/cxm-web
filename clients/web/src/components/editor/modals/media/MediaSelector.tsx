import { memo, useState } from 'react'
import styles from './MediaSelector.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { default as NextImage } from 'next/image'
import { BlockData, BlockType, MediaSourceType, MediaSourceObject, BlockDataImageUpload } from '../../blocks/types'
import SourceTabBar from './SourceTabBar'
import Source from './Source'

export const MediaSelector = ({ onImageUpdate, onUpdate, id }: IProps) => {
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
  const libraries = [
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
  sources = sources.concat(libraries)

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SourceTabBar sources={sources} selectSource={_selectSource} selected={selectedSource.name} setPictures={_setPictures} />
        <Source
          selected={selectedSource}
          onUpdate={onUpdate}
          onImageUpdate={onImageUpdate}
          pictures={pictures}
          setPictures={setPictures}
          id={id}
        />
      </div>
    </div>
  )
}

interface IProps {
  onImageUpdate: (value: BlockData, pendingUploadFile: File, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  id: number
}

export default memo(MediaSelector)
