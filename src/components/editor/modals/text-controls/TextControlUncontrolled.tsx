import { HTMLProps, useRef } from 'react'
import { useOnClickOutside } from 'utils/hooks'
import LinkButton from './LinkButton'
import StyleButton, { StyleTypes } from './StyleButton'
import styles from './TextControlUncontrolled.module.scss'

const TextControlsUncontrolled = ({ onDismiss, ...props }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    onDismiss()
  })

  return (
    <div {...props} ref={ref} className={styles.container}>
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

export default TextControlsUncontrolled

interface IProps extends HTMLProps<HTMLDivElement> {
  onDismiss: () => void
}
