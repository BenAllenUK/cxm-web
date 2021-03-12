import { useGenerateUploadAssetUrlMutation, useGenerateReadAssetUrlMutation } from 'generated/graphql'
import { createContext, ReactNode, useContext, useState } from 'react'
import uploadFile from 'operations/assets/upload'

import { BlockDataImageUpload } from 'components/editor/blocks/types'

const initialState = {
  upload: () => new Promise<null>(() => null),
  getSecureUrl: () => new Promise<null>(() => null),
  addPendingUpload: () => null,
  removePendingUpload: () => null,
  pendingUploads: {},
}

interface Context {
  pendingUploads: { [key: number]: BlockDataImageUpload }
}
interface ContextActions extends Context {
  upload: (data: any, type: string, callback: (progress: number) => any) => Promise<{ key: string } | null>
  getSecureUrl: (data: any, type: string) => Promise<{ url: string } | null>
  addPendingUpload: (pendingUpload: BlockDataImageUpload) => void
  removePendingUpload: (id: number) => void
}

const Context = createContext<ContextActions>(initialState)

export const useAsset = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [generateAssetUrl] = useGenerateUploadAssetUrlMutation()
  const [readAssetUrl] = useGenerateReadAssetUrlMutation()
  const [pendingUploads, setPendingUploads] = useState<Context>(initialState)
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

  const addPendingUpload = (pendingUpload: BlockDataImageUpload) => {
    setPendingUploads((prevUploads) => ({
      ...prevUploads,
      [pendingUpload.id]: pendingUpload,
    }))
  }

  const removePendingUpload = (id: number) => {
    setPendingUploads((prevUploads) => {
      const newPendingUploads = { ...prevUploads.pendingUploads }
      delete newPendingUploads[id]
      return { ...prevUploads, pendingUploads: newPendingUploads }
    })
  }

  return (
    <Context.Provider value={{ ...pendingUploads, upload, getSecureUrl, addPendingUpload, removePendingUpload }}>
      {children}
    </Context.Provider>
  )
}

interface IProps {
  children: ReactNode
}

export default Provider
