import { memo, useRef } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from './types'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput from 'components/common/text-input/TextInput'

const uploadSource = (setMediaSource: React.Dispatch<React.SetStateAction<string | null>>) => {
  const hiddenFileInput = useRef(null)

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current?.click()
    }
  }

  const handleChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    setMediaSource(URL.createObjectURL(fileUploaded))
  }

  return (
    <div className={styles.uploadSource}>
      <>
        <Button onClick={handleClick} className={styles.button}>
          Choose an image
        </Button>
        <input ref={hiddenFileInput} style={{ display: 'none' }} type="file" onChange={handleChange} />
      </>
      <text className={styles.text}>The maximum size per file is 5 MB</text>
    </div>
  )
}

const embedLink = (setMediaSource: React.Dispatch<React.SetStateAction<string | null>>) => {
  let link = ''
  const handleClick = () => {
    setMediaSource(link)
  }

  const onChange = (e: string) => {
    link = e
  }
  return (
    <div className={styles.uploadSource}>
      <TextInput
        focusedPlaceholder={'Paste the image link...'}
        blurredPlaceholder={'Paste the image link...'}
        html={link}
        onChange={onChange}
        className={styles.linkInput}
      />
      <Button onClick={handleClick} className={styles.button}>
        Embed image
      </Button>

      <text className={styles.text}>Works with any image from the web</text>
    </div>
  )
}

export const Source = ({ selected, setMediaSource, pictures, setPictures }: IProps) => {
  switch (selected.type) {
    case MediaSourceType.UPLOAD: {
      return uploadSource(setMediaSource)
    }
    case MediaSourceType.EMBED_LINK: {
      return embedLink(setMediaSource)
    }
    default:
      return <AssetLibrary setMediaSource={setMediaSource} source={selected} pictures={pictures} setPictures={setPictures} />
  }
}

interface IProps {
  pictures: any[]
  selected: MediaSourceObject
  setMediaSource: React.Dispatch<React.SetStateAction<string | null>>
  setPictures: any
}

export default memo(Source)
