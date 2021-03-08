import { memo, useRef } from 'react'
import { useAsset } from 'components/providers/assets'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from './types'
import { BlockDataImage } from '../../blocks/types'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput from 'components/common/text-input/TextInput'

const uploadSource = (setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage>>, id: number) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current?.click()
    }
  }

  const handleChange = async (event: any) => {
    const fileUploaded = event.target.files[0]
    let fileReader = new FileReader()
    fileReader.onload = async function (e) {
      var image = fileReader.result

      //setMediaSource({ ...mediaSource, value: image, file: fileUploaded })
    }

    await fileReader.readAsDataURL(fileUploaded)
  }

  return (
    <div className={styles.uploadSource}>
      <>
        <Button onClick={handleClick} className={styles.button}>
          Choose an image
        </Button>
        <input ref={hiddenFileInput} style={{ display: 'none' }} type="file" onChange={handleChange} />
      </>
      <div className={styles.text}>The maximum size per file is 5 MB</div>
    </div>
  )
}

const embedLink = (setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage>>, mediaSource: BlockDataImage) => {
  let link = ''
  const handleClick = () => {
    // update block to have link
  }

  const onChange = (e: any) => {
    link = e.target.value
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

      <div className={styles.text}>Works with any image from the web</div>
    </div>
  )
}

export const Source = ({ selected, setMediaSource, mediaSource, pictures, setPictures }: IProps) => {
  switch (selected.type) {
    case MediaSourceType.UPLOAD: {
      return uploadSource(setMediaSource, 0)
    }
    case MediaSourceType.EMBED_LINK: {
      return embedLink(setMediaSource, mediaSource)
    }
    default:
      return <AssetLibrary setMediaSource={setMediaSource} source={selected} pictures={pictures} setPictures={setPictures} />
  }
}

interface IProps {
  pictures: any[]
  selected: MediaSourceObject
  setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage>>
  mediaSource: BlockDataImage
  setPictures: any
}

export default memo(Source)
