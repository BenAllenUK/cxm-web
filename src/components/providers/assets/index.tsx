import { useGenerateUploadAssetUrlMutation, useGenerateReadAssetUrlMutation } from 'generated/graphql'
import { createContext, ReactNode, useContext } from 'react'
import uploadFile from 'operations/assets/upload'

const initialState = {
  upload: () => new Promise<null>(() => null),
  getSecureUrl: () => new Promise<null>(() => null),
}

interface ContextActions {
  upload: (data: any, type: string, callback: (progress: number) => any) => Promise<{ key: string } | null>
  getSecureUrl: (data: any, type: string) => Promise<{ url: string } | null>
}

const Context = createContext<ContextActions>(initialState)

export const useAsset = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [generateAssetUrl] = useGenerateUploadAssetUrlMutation()
  const [readAssetUrl] = useGenerateReadAssetUrlMutation()

  const upload = async (data: any, contentType: string, onUploadProgress: (progress: number) => any = (i) => null) => {
    console.log('in the upload')
    const response = await generateAssetUrl({ variables: { contentType } })
    console.log('apollo response', response)
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

  return <Context.Provider value={{ upload, getSecureUrl }}>{children}</Context.Provider>
}

interface IProps {
  children: ReactNode
}

export default Provider
