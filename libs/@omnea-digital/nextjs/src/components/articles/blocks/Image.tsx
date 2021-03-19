import { BlockDataImage } from '../../../types'
import './Image.scss'
// import { default as NextImage } from 'next'

export default function Image({ content }: IProps) {
  const { value } = content

  return (
    <div className={'omnea-content-image'}>
      {/* <NextImage width={400} height={400} /> */}
      {value && <img style={{ width: 100, height: 100 }} src={value} />}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}
