import { memo, useRef, useState } from 'react'
import { useAsset } from 'components/providers/assets'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from 'components/editor/blocks/types'
import { BlockDataImage } from '../../blocks/types'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput from 'components/common/text-input/TextInput'

const uploadSource = (onUpdate: (value: BlockDataImage) => void, id: number) => {
  const { addPendingUpload } = useAsset()
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
      onUpdate({ value: image, type: MediaSourceType.LOCAL })
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

const embedLink = (onUpdate: (value: BlockDataImage) => void) => {
  let link = ''
  const handleClick = () => {
    onUpdate({ value: link, type: MediaSourceType.EMBED_LINK })
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

export const Source = ({ selected, onUpdate, pictures, setPictures }: IProps) => {
  switch (selected.type) {
    case MediaSourceType.UPLOAD: {
      return uploadSource(onUpdate, 0)
    }
    case MediaSourceType.EMBED_LINK: {
      return embedLink(onUpdate)
    }
    default:
      return <AssetLibrary onUpdate={onUpdate} source={selected} pictures={pictures} setPictures={setPictures} />
  }
}

interface IProps {
  pictures: any[]
  selected: MediaSourceObject
  onUpdate: (value: BlockDataImage) => void
  setPictures: any
}

export default memo(Source)
