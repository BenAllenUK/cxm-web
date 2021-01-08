import React, { MouseEvent } from 'react'
import styles from './TextControls.module.scss'

class LinkButton extends React.Component<IProps> {
  render() {
    return (
      <div
        key={'createLink'}
        className={styles.linkButton}
        onMouseDown={(evt: MouseEvent<HTMLDivElement>) => {
          evt.preventDefault()
          document.execCommand(
            'createLink',
            false,
            'https://github.com/lovasoa/react-contenteditable'
          )
        }}
      >
        Link
      </div>
    )
  }
}

interface IProps {}

export default LinkButton
