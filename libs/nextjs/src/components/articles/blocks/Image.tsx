import { BlockDataImage } from '../../../types'
import './Image.scss'

export default function Image({ content }: IProps) {
  const { value } = content

  return (
    <div className={'omnea-content-image'}>
      {value && <img style={{ width: 100, height: 100 }} src={value} />}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}
