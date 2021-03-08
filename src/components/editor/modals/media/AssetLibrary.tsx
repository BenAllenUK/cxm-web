import { memo, useRef, useState } from 'react'
import styles from './MediaSelector.module.scss'
import TextInput from 'components/common/text-input/TextInput'
import { BlockDataImage } from '../../blocks/types'
import { createApi } from 'unsplash-js'
import { MediaSourceObject } from './types'
import ImageGrid from './cloudinary/ImageGrid'
import { fetchPhotos } from './cloudinary/index'

export const AssetLibrary = ({ source, setMediaSource, setPictures, pictures }: IProps) => {
  const [query, setQuery] = useState('')
  const handleClick = (url: string) => {
    setMediaSource(url)
  }
  const unsplash = createApi({
    accessKey: source.accessKey,
  })

  const onChange = (e: any) => {
    setQuery(e.target.value)
    if (source.name === 'Cloudinary') {
      fetchPhotos(e.target.value).then((result) => {
        setPictures(result)
        console.log('cloudinary photos', result)
      })
    } else {
      unsplash.search.getPhotos({ query: e.target.value, orderBy: 'relevant', page: 1, perPage: 10 }).then((result) => {
        setPictures(result.response?.results)
      })
    }
  }

  return (
    <div className={styles.uploadSource}>
      <TextInput
        focusedPlaceholder={'Search for an image...'}
        blurredPlaceholder={'Search for an image...'}
        html={query.toString()}
        onChange={onChange}
        className={styles.linkInput}
      />
      <div className={styles.grid}>
        {source.name === 'Cloudinary' ? (
          <ImageGrid pictures={pictures} />
        ) : (
          pictures.map((picture) => (
            <img src={picture.urls.small} className={styles.gridElement} onClick={() => handleClick(picture.urls.full)} />
          ))
        )}
      </div>
    </div>
  )
}

interface IProps {
  setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage | null | string>>
  source: MediaSourceObject
  pictures: any[]
  setPictures: any
}

export default memo(AssetLibrary)
