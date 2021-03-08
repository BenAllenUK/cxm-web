import { useAsset } from 'components/providers/assets'
import { useCallback } from 'react'
import { BlockDataImage } from 'components/editor/blocks/types'

export const _uploadFile = async (
  setMediaSource: React.Dispatch<React.SetStateAction<BlockDataImage>>,
  mediaSource: BlockDataImage
) => {
  if (!mediaSource.file) {
    return
  }
  const { upload } = useAsset()
  await upload(mediaSource.file, mediaSource.file.type, (progress) => {
    console.log('progress', progress)
    setMediaSource({
      ...mediaSource,
      progress,
    })
  }).then((response) => {
    if (!response) {
      console.log(`Error`)
      return
    } else {
      console.log('got response')
      return response
    }
  })
}
