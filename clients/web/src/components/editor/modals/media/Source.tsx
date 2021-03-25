import { memo, useRef, useState } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from 'components/editor/blocks/types'
import { BlockDataMedia, BlockData, BlockType } from '../../blocks/types'
import fileTypeToBlockType from '../../utils/fileTypeToBlockType'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput from 'components/common/text-input/TextInput'

export const Source = ({ selected, onMediaUpdate, onUpdate, pictures, setPictures, id, fileFilter }: IProps) => {
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
        var file = fileReader.result
        if (onMediaUpdate) {
          onMediaUpdate(
            {
              value: file?.toString() || null,
              fileName: fileUploaded.name,
              fileSize: fileUploaded.size,
              sourceType: MediaSourceType.LOCAL,
            },
            fileUploaded,
            BlockType.IMAGE
          )
        } else {
        }
      }

      const blockType = fileTypeToBlockType(fileUploaded.type)
      if (blockType === BlockType.IMAGE) {
        console.log('uploaded image')
        await fileReader.readAsDataURL(fileUploaded)
      } else {
        console.log('uploaded file', fileUploaded)
        onMediaUpdate(
          {
            value: fileUploaded.name,
            fileName: fileUploaded.name,
            fileSize: fileUploaded.size,
            sourceType: MediaSourceType.LOCAL,
          },
          fileUploaded,
          blockType
        )
      }
    }

    return (
      <div className={styles.uploadSource}>
        <>
          <Button onClick={handleClick} className={styles.button}>
            Choose an image
          </Button>
          <input ref={hiddenFileInput} style={{ display: 'none' }} type="file" onChange={handleChange} accept={fileFilter} />
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
  onMediaUpdate: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  setPictures: any
  id: number
  fileFilter?: string
}

export default memo(Source)
