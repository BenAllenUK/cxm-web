import React from 'react'

import StyleButton, { StyleTypes } from './StyleButton'
import LinkButton from './LinkButton'

import styles from './TextControls.module.scss'

class TextControls extends React.Component<IProps> {
  render() {
    const { position } = this.props
    return (
      <div
        className={styles.container}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <StyleButton type={StyleTypes.BOLD} />
        <StyleButton type={StyleTypes.ITALIC} />
        <StyleButton type={StyleTypes.UNDERLINE} />
        <StyleButton type={StyleTypes.STRIKE_THROUGH} />
        <LinkButton />
        {/* <StyleButton type="formatBlock" arg="h2" name="heading2" />
        <StyleButton type="formatBlock" arg="h3" name="heading3" /> */}
        {/* <StyleButton
          type="createLink"
          arg="https://github.com/lovasoa/react-contenteditable"
          name="hyperlink"
        /> */}
      </div>
    )
  }
}

interface IProps {
  position: { x: number; y: number }
}

export default TextControls
