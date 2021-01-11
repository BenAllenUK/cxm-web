import React from 'react'
import { BlockDataImage } from '../../types'
import styles from './Image.module.scss'
import ImageIcon from 'images/icons/image.svg'
import { default as NextImage } from 'next/image'

class Image extends React.Component<IProps> {
  renderEmptyState = () => {
    const { innerRef } = this.props
    return (
      <div className={styles.container} ref={innerRef}>
        <ImageIcon className={styles.icon} width={25} height={25} />

        <div className={styles.text}>Add an image</div>
      </div>
    )
  }

  render() {
    const { content, innerRef } = this.props

    if (!content.source) {
      return this.renderEmptyState()
    }

    return (
      <div className={styles.container} ref={innerRef}>
        <NextImage
          layout="intrinsic"
          width={600}
          height={400}
          objectFit={'contain'}
          src={content.source}
        />
      </div>
    )
  }
}

interface IProps {
  innerRef: (ref: any | null) => void
  content: BlockDataImage
}

export default Image
