import React from 'react'
import styles from './TextControls.module.scss'

export enum StyleTypes {
  BOLD,
  ITALIC,
  UNDERLINE,
  STRIKE_THROUGH,
}

class StyleButton extends React.Component<IProps> {
  renderName = (type: StyleTypes) => {
    switch (type) {
      case StyleTypes.BOLD:
        return <div>B</div>
      case StyleTypes.ITALIC:
        return <div className={styles.italic}>I</div>
      case StyleTypes.UNDERLINE:
        return <div className={styles.underline}>U</div>
      case StyleTypes.STRIKE_THROUGH:
        return <div className={styles.strikeThrough}>S</div>
    }
  }

  commandType = (type: StyleTypes) => {
    switch (type) {
      case StyleTypes.BOLD:
        return 'bold'
      case StyleTypes.ITALIC:
        return 'italic'
      case StyleTypes.UNDERLINE:
        return 'underline'
      case StyleTypes.STRIKE_THROUGH:
        return 'strikeThrough'
      default:
        return 'bold'
    }
  }

  render() {
    const { type } = this.props
    const cmd = this.commandType(type)
    const name = this.renderName(type)
    return (
      <div
        className={styles.styleButton}
        key={cmd}
        onMouseDown={(evt) => {
          evt.preventDefault()
          document.execCommand(cmd, false)
        }}
      >
        {name}
      </div>
    )
  }
}

interface IProps {
  type: StyleTypes
}

export default StyleButton
