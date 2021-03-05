import { memo, useState } from 'react'
import styles from './MediaSelector.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { default as NextImage } from 'next/image'
import { BlockDataImage } from '../../blocks/types'
import SourceTabBar from './SourceTabBar'
import Source from './Source'
import { MediaSourceType, MediaSourceObject } from './types'

export const MediaSelector = ({ setMediaSource, mediaSource, setUploadFile }: IProps) => {
  const [selectedSource, setSelectedSource] = useState({ name: MediaSourceType.UPLOAD, type: MediaSourceType.UPLOAD })
  const [pictures, setPictures] = useState([])

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
      type: MediaSourceType.LIBRARY,
    },
  ]
  sources = sources.concat(libraries)

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <SourceTabBar
          sources={sources}
          selectSource={setSelectedSource}
          selected={selectedSource.name}
          setPictures={setPictures}
        />
        <Source
          selected={selectedSource}
          setMediaSource={setMediaSource}
          mediaSource={mediaSource}
          pictures={pictures}
          setPictures={setPictures}
          setUploadFile={setUploadFile}
        />
      </div>
    </div>
  )
}

interface IProps {
  setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage>>
  mediaSource: BlockDataImage
  setUploadFile: React.Dispatch<React.SetStateAction<boolean>>
}

export default memo(MediaSelector)
