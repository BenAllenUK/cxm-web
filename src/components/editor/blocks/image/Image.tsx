import { memo, useState, useCallback, useEffect } from 'react'
import { BlockDataImage } from '../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { useAsset } from 'components/providers/assets'
import { BlockData, BlockType } from 'components/editor/blocks/types'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import { default as NextImage } from 'next/image'

export const Image = ({ content, onUpdate }: IProps) => {
  const [showSelector, setShowSelector] = useState(false)
  const [mediaSource, setMediaSource] = useState(content)
  const [uploadFile, setUploadFile] = useState(content.uploadFile)
  const { upload } = useAsset()

  const _uploadFile = useCallback(async () => {
    setUploadFile(false)
    setMediaSource({ ...mediaSource, uploadFile: false })

    if (!mediaSource.localValue) {
      return
    }

    await upload(mediaSource.file, mediaSource.type, (progress) => {
      console.log('progress', progress)
      setMediaSource({
        ...mediaSource,
        progress,
      })
    }).then((response) => {
      if (!response) {
        console.log(`Error`)
        return
      }
      onUpdate({ ...mediaSource, value: response.key, localValue: undefined, progress: null, uploadFile: false })
    })
  }, [mediaSource, uploadFile, setMediaSource, setUploadFile, upload])

  useEffect(() => {
    if (uploadFile) {
      _uploadFile()
    }
  }, [_uploadFile])

  if (!mediaSource.value && !mediaSource.localValue) {
    return (
      <div>
        <div className={styles.container} onClick={() => setShowSelector(!showSelector)}>
          <ImageIcon className={styles.icon} width={25} height={25} />

          <div className={styles.text}>Add an image</div>
        </div>
        {showSelector && (
          <MediaSelector setUploadFile={setUploadFile} setMediaSource={setMediaSource} mediaSource={mediaSource} />
        )}
      </div>
    )
  }

  return (
    <div className={styles.imageContainer}>
      <img className={styles.image} src={mediaSource.localValue || `${process.env.OMNEA_UPLOAD_URL}/${mediaSource.value}`} />
      {mediaSource.progress && <div className={styles.progress}>{mediaSource.progress}</div>}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
  onUpdate: (value: BlockDataImage) => void
}

export default memo(Image)
