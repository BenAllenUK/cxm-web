import styles from './SettingsControls.module.scss'
import { ISettingsTextInput } from '.'
import Input from 'components/common/text-input/TextInput'
import { useState } from 'react'

const TextInput = ({ element }: IProps) => {
  const [textInputValue, setTextInputValue] = useState(element.value)

  const _onChange = (e: any) => {
    if (e.key === 'Enter') {
      element.onUpdate(textInputValue)
    }
    if (element.isSnakeCase) {
      setTextInputValue(
        e.target.value
          .replace(/\s+/g, '-')
          .toLowerCase()
          .replace(/[^a-z-/]/gi, '')
      )
    } else {
      setTextInputValue(e.target.value)
    }
  }

  return (
    <div>
      <div className={element.hint ? styles.labelWithHint : styles.label}>{element.label}</div>
      <Input
        focusedPlaceholder={element.placeholder}
        blurredPlaceholder={''}
        html={textInputValue}
        onChange={_onChange}
        className={styles.textInput}
        useInnerText
        disabled={element.disabled}
      />
      {element.hint && <div className={styles.hint}>{element.hint}</div>}
    </div>
  )
}

export default TextInput

interface IProps {
  element: ISettingsTextInput
}
