import { useGenerateUploadAssetUrlMutation, useGenerateReadAssetUrlMutation } from 'generated/graphql'
import { createContext, ReactNode, useContext, useState } from 'react'
import uploadFile from 'operations/assets/upload'

import { BlockDataMediaUpload, BlockDataMedia } from 'components/editor/blocks/types'

const initialState = {
  upload: () => new Promise<null>(() => null),
  getSecureUrl: () => new Promise<null>(() => null),
  addPendingUpload: () => null,
  removePendingUpload: () => null,
  addLocalImage: () => null,
  removeLocalImage: () => null,
  pendingUploads: {},
  localImages: {},
}

interface Context {
  pendingUploads: { [key: number]: BlockDataMediaUpload }
  localImages: { [key: number]: string }
}
interface ContextActions extends Context {
  upload: (data: any, type: string, callback: (progress: number) => any) => Promise<{ key: string } | null>
  getSecureUrl: (data: any, type: string) => Promise<{ url: string } | null>
  addPendingUpload: (pendingUpload: BlockDataMediaUpload) => void
  addLocalImage: (image: string, id: number) => void
  removeLocalImage: (id: number) => void
  removePendingUpload: (id: number) => void
}

const Context = createContext<ContextActions>(initialState)

export const useAsset = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [generateAssetUrl] = useGenerateUploadAssetUrlMutation()
  const [readAssetUrl] = useGenerateReadAssetUrlMutation()
  const [pendingUploads, setPendingUploads] = useState<{ [key: number]: BlockDataMediaUpload }>(initialState)
  const [localImages, setLocalImages] = useState<{ [key: number]: string }>(initialState)
  const upload = async (data: any, contentType: string, onUploadProgress: (progress: number) => any = (i) => null) => {
    const response = await generateAssetUrl({ variables: { contentType } })
    const url = response.data?.assets_generate_upload_url?.url
    const key = response.data?.assets_generate_upload_url?.key
    if (url && key) {
      await uploadFile(url, data, contentType, {
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent.loaded / progressEvent.total),
      })
      return { key }
    } else {
      console.error(`Could not generate Upload URL ${response}`)
      return null
    }
  }

  const getSecureUrl = async (key: string) => {
    const response = await readAssetUrl({ variables: { key } })
    const url = response.data?.assets_generate_read_url?.url
    if (url) {
      return { url }
    } else {
      console.error(`Could not generate Read URL ${response}`)
      return null
    }
  }

  const addPendingUpload = async (pendingUpload: BlockDataMediaUpload) => {
    console.log('in add pending upload, should just see this once', pendingUpload)
    setPendingUploads((prevUploads) => ({
      ...prevUploads,
      [pendingUpload.id]: pendingUpload,
    }))
    const response = await upload(pendingUpload.file, pendingUpload.file.type, (progress) => {
      console.log('progress', progress)
      setPendingUploads((prevUploads) => ({
        ...prevUploads,
        [pendingUpload.id]: { ...pendingUpload, progress: progress },
      }))
    })
    removePendingUpload(pendingUpload.id)
    if (!response) {
      console.log(`Error Uploading Image`)
      return
    }
    return response.key
  }

  const removePendingUpload = (id: number) => {
    setPendingUploads((prevUploads) => {
      const newPendingUploads = { ...pendingUploads }
      delete newPendingUploads[id]
      return {}
    })
  }

  const addLocalImage = (image: string, id: number) => {
    setLocalImages((prevImages) => ({
      ...prevImages,
      [id]: image,
    }))
  }

  const removeLocalImage = (id: number) => {
    setLocalImages((prevImages) => {
      const newLocalImages = { ...prevImages }
      delete newLocalImages[id]
      return {}
    })
  }

  return (
    <Context.Provider
      value={{
        localImages,
        pendingUploads,
        upload,
        getSecureUrl,
        addPendingUpload,
        removePendingUpload,
        addLocalImage,
        removeLocalImage,
      }}
    >
      {children}
    </Context.Provider>
  )
}

interface IProps {
  children: ReactNode
}

export default Provider
