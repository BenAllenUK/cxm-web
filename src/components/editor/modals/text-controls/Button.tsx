import { MouseEvent, ReactNode } from 'react'
import styles from './TextControlUncontrolled.module.scss'

const Button = ({ children, command, commandArg, onClick, ...otherProps }: IProps) => {
  const _onMouseDown = (e: MouseEvent) => {
    // NOTE: Avoid deselecting word
    e.preventDefault()
  }

  const _onClick = (e: MouseEvent) => {
    if (command) {
      document.execCommand(command, false, commandArg)
    }

    onClick && onClick()
    e.preventDefault()
  }

  return (
    <div key={command} onClick={_onClick} onMouseDown={_onMouseDown} className={styles.button} data-for="editor" {...otherProps}>
      {children}
    </div>
  )
}

export default Button

interface IProps {
  children: ReactNode
  command?: string
  commandArg?: string
  onClick?: () => void
}

// class StyleButton extends React.Component<IProps> {
//   renderName = (type: StyleTypes) => {
//     switch (type) {
//       case StyleTypes.BOLD:
//         return <div>B</div>
//       case StyleTypes.ITALIC:
//         return <div className={styles.italic}>i</div>
//       case StyleTypes.UNDERLINE:
//         return <div className={styles.underline}>U</div>
//       case StyleTypes.STRIKE_THROUGH:
//         return <div className={styles.strikeThrough}>S</div>
//     }
//   }

//   commandType = (type: StyleTypes) => {
//     switch (type) {
//       case StyleTypes.BOLD:
//         return 'bold'
//       case StyleTypes.ITALIC:
//         return 'italic'
//       case StyleTypes.UNDERLINE:
//         return 'underline'
//       case StyleTypes.STRIKE_THROUGH:
//         return 'strikeThrough'
//       default:
//         return 'bold'
//     }
//   }

//   render() {
//     const { type } = this.props
//     const cmd = this.commandType(type)
//     const name = this.renderName(type)
//     return (
//       <div
//         className={styles.styleButton}
//         key={cmd}
//         onMouseDown={(evt) => {
//           evt.preventDefault()
//           document.execCommand(cmd, false)
//         }}
//       >
//         {name}
//       </div>
//     )
//   }
// }

// interface IProps {
//   type: StyleTypes
// }

// export default StyleButton
