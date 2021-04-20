import { memo, useRef, useState, ChangeEvent } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject, MediaSourceType } from 'components/editor/blocks/types'
import { BlockDataMedia, BlockData, BlockType } from '../../blocks/types'
import fileTypeToBlockType from '../../utils/fileTypeToBlockType'
import Button from 'components/common/button/Button'
import AssetLibrary from './AssetLibrary'
import TextInput, { TextInputEvent } from 'components/common/text-input/TextInput'

export const Source = ({ selected, onMediaUpdate, onUpdate, pictures, setPictures, fileFilter, isVideo, isButton }: IProps) => {
  const mediaString = isVideo ? 'video' : isButton ? '' : !fileFilter ? 'file' : 'image'
  const EmbedLink = () => {
    const [link, setLink] = useState('')
    const handleClick = () => {
      onUpdate({ value: link, sourceType: MediaSourceType.EMBED_LINK })
    }

    const onChange = (e: TextInputEvent) => {
      setLink(e.target.value.replace(/[\n\r]/g, ''))
    }
    return (
      <div className={styles.uploadSource}>
        <TextInput
          focusedPlaceholder={`Paste the ${mediaString} link...`}
          blurredPlaceholder={`Paste the ${mediaString} link...`}
          html={link}
          onChange={onChange}
          className={styles.linkInput}
        />
        <Button onClick={handleClick} className={styles.button}>
          {`Embed ${mediaString}`}
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

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return
      }
      const fileUploaded = event.target.files[0]
      const fileReader = new FileReader()
      fileReader.onload = async function (e) {
        const file = fileReader.result
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
        await fileReader.readAsDataURL(fileUploaded)
      } else {
        if (onMediaUpdate) {
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
    }

    return (
      <div className={styles.uploadSource}>
        <>
          <Button onClick={handleClick} className={styles.button}>
            {`Choose ${isVideo ? 'a' : 'an'} ${mediaString}`}
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
  onMediaUpdate?: (value: BlockDataMedia, pendingUploadFile: File, blockType: BlockType, createNew?: boolean) => void
  onUpdate: (value: BlockData, type?: BlockType) => void
  setPictures: any
  isVideo?: boolean
  isButton?: boolean
  fileFilter?: string
}

export default memo(Source)
