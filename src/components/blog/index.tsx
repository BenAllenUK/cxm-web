import React from 'react'

import { BlockData } from 'components/types'
import styles from './Blog.module.scss'
import Post from './post/Post'

class Blog extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.body}>
        <Post blocks={this.props.blocks} />
      </div>
    )
  }
}

interface IProps {
  blocks: BlockData[]
}

export default Blog
