import { BlockDataImage } from '../../../types'
import styles from './Image.module.scss'
// import { default as NextImage } from 'next/image'

export default function Image({ content }: IProps) {
  const { value } = content

  return (
    <div className={styles.container}>
      {value && <img style={{ width: 100, height: 100 }} src={value} />}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}
