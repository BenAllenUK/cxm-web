import React from 'react'
import styles from './Divider.module.scss'

class Divider extends React.Component<IProps> {
  render() {
    const { innerRef } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.divide} ref={innerRef}></div>
      </div>
    )
  }
}

interface IProps {
  innerRef: (ref: any | null) => void
}

export default Divider
