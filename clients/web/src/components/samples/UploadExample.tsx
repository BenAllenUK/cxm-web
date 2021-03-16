import { useAsset } from 'components/providers/assets'
import Image from 'next/image'
import { useRef, useState } from 'react'

const UploadExample = ({}: IProps) => {
  const { upload } = useAsset()
  const ref = useRef<HTMLInputElement>(null)

  const [uploadedKey, setUploadedKey] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)

  const _onPublishClick = async () => {
    const item = ref?.current
    if (!item || !item.files) {
      return
    }
    const file = item.files[0]

    if (!file) {
      return
    }
    await upload(file, file.type, (progress) => {
      console.log(progress)
      setProgress(progress)
    }).then((response) => {
      if (!response) {
        console.log(`Error`)
        return
      }

      const { key } = response
      console.log(`Done!`)
      setTimeout(() => {
        setUploadedKey(key)
      }, 3000)
    })
  }

  const HOST = process.env.OMNEA_UPLOAD_URL

  return (
    <div style={{ padding: 20, margin: 10, border: '1px solid black' }}>
      Upload file example:
      <br />
      <input ref={ref} type="file" />
      <div style={{ border: '1px solid black', margin: 10, width: 100 }} onClick={_onPublishClick}>
        Upload
      </div>
      {uploadedKey && <Image src={`${HOST}/${uploadedKey}`} width={100} height={100} />}
      {progress && <div>{progress}</div>}
    </div>
  )
}

export default UploadExample

interface IProps {}
