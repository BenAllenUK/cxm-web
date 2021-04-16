import { memo, useState } from 'react'
import styles from './FileSelectionUncontrolled.module.scss'
import TextInput from 'components/common/text-input/TextInput'
import { BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../../blocks/types'
import { createApi } from 'unsplash-js'
import ImageGrid from './cloudinary/ImageGrid'
import { fetchPhotos } from './cloudinary/index'

export const AssetLibrary = ({ source, onUpdate, onSetPictures, pictures }: IProps) => {
  const [query, setQuery] = useState('')
  const handleClick = (url: string) => {
    onUpdate({ value: url, type: source.type })
  }

  const unsplash = createApi({
    accessKey: source.accessKey,
  } as {
    accessKey: string
    apiUrl?: undefined
  })

  const onChange = async (e: any) => {
    setQuery(e.target.value)
    if (source.type === MediaSourceType.CLOUDINARY) {
      const result = await fetchPhotos(e.target.value)
      onSetPictures(result)
    } else {
      const result = await unsplash.search.getPhotos({ query: e.target.value, orderBy: 'relevant', page: 1, perPage: 10 })
      onSetPictures(result.response?.results)
    }
  }

  const LibraryPicture = ({ picture }: any) => {
    const _handleClick = () => {
      handleClick(picture.urls.full)
    }
    return <img key={picture.urls.small} src={picture.urls.small} className={styles.gridElement} onClick={_handleClick} />
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
        {source.type === MediaSourceType.CLOUDINARY ? (
          <ImageGrid pictures={pictures || []} handleClick={handleClick} />
        ) : (
          pictures.map((picture) => {
            return <LibraryPicture picture={picture} />
          })
        )}
      </div>
    </div>
  )
}

interface IProps {
  onUpdate: (value: BlockData, type?: BlockType) => void
  source: MediaSourceObject
  pictures: any[]
  onSetPictures: any
}

export default memo(AssetLibrary)
