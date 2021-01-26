import React from 'react'

import { Block } from 'components/types'
import styles from './Content.module.scss'
import Article from './articles/Article'

class Content extends React.Component<IProps> {
  render() {
    return (
      <div className={styles.body}>
        <Article blocks={this.props.blocks} />
      </div>
    )
  }
}

interface IProps {
  blocks: Block[]
}

export default Content
