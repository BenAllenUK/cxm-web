import { BlockDataImage } from 'components/editor/blocks/types'
import styles from './Image.module.scss'
import { default as NextImage } from 'next/image'

export default function Image({ content }: IProps) {
  const { value } = content

  return (
    <div className={styles.container}>
      {value && <NextImage layout="intrinsic" width={600} height={400} objectFit={'contain'} src={value} />}
    </div>
  )
}

interface IProps {
  content: BlockDataImage
}
