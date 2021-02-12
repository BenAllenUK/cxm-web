import TextInput from 'components/common/TextInput'
import { useEffect, useRef } from 'react'
import { useOnClickOutside, useWindowKeyDown } from 'utils/hooks'
import styles from './RenameControlsModal.module.scss'

const RenameControlsModal = ({ value, position, onDismiss, onTextChange, onSubmit }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    onDismiss()
  })

  useWindowKeyDown(
    'Enter',
    (e) => {
      onDismiss()
      onSubmit()
      e.preventDefault()
    },
    [onSubmit, onDismiss]
  )

  useWindowKeyDown(
    'Escape',
    (e) => {
      onDismiss()
      e.preventDefault()
    },
    [onDismiss]
  )

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
      document.execCommand('selectAll', false)
    }
  }, [inputRef])

  return (
    <div ref={ref} className={styles.container} style={{ left: position.x, top: position.y }}>
      <TextInput className={styles.textInput} html={value || ''} ref={inputRef} onChange={(e) => onTextChange(e.target.value)} />
    </div>
  )
}

interface IProps {
  value?: string | null
  position: { x: number; y: number }
  onTextChange: (value: string) => void
  onDismiss: () => void
  onSubmit: () => void
}

export default RenameControlsModal
