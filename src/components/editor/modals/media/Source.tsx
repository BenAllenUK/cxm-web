import { memo, useRef, useState } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from 'components/editor/blocks/types'
import { BlockDataImage, BlockData, BlockType, BlockDataImageUpload } from '../../blocks/types'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput from 'components/common/text-input/TextInput'

export const Source = ({ selected, onImageUpdate, onUpdate, pictures, setPictures, id }: IProps) => {
  const EmbedLink = () => {
    const [link, setLink] = useState('')
    const handleClick = () => {
      onUpdate({ value: link, type: MediaSourceType.EMBED_LINK })
    }

    const onChange = (e: any) => {
      setLink(e.target.value)
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

  const UploadSource = () => {
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
        onImageUpdate({ value: image, type: MediaSourceType.LOCAL }, fileUploaded)
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

  switch (selected.type) {
    case MediaSourceType.UPLOAD: {
      return <UploadSource />
    }
    case MediaSourceType.EMBED_LINK: {
      return <EmbedLink />
    }
    default:
      return <AssetLibrary onUpdate={onUpdate} source={selected} pictures={pictures} setPictures={setPictures} />
  }
}

interface IProps {
  pictures: any[]
  selected: MediaSourceObject
  onImageUpdate: (value: BlockData, pendingUploadFile: File, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  setPictures: any
  id: number
}

export default memo(Source)
