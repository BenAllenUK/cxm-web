import styles from './TextInputBlock.module.scss'
import { BlockDataTextInput, BlockData, BlockType } from '../types'
import TextInput, { TextInputEvent } from 'components/common/text-input/TextInput'
import { useState } from 'react'

const TextInputBlock = ({ content, onUpdate }: IProps) => {
  const [placeholderText, setPlaceholderText] = useState(content.value)

  const onTextChange = (e: TextInputEvent) => {
    setPlaceholderText(e.target.value)
    onUpdate({ ...content, value: e.target.value }, BlockType.TEXT_INPUT)
  }

  return (
    <div className={styles.container}>
      <TextInput
        focusedPlaceholder={'Add placeholder text'}
        blurredPlaceholder={'Add placeholder text'}
        html={placeholderText}
        onChange={onTextChange}
        className={styles.textInput}
        useInnerHtml
      />
    </div>
  )
}

export default TextInputBlock

interface IProps {
  content: BlockDataTextInput
  onDeleteBlock: () => void
  onUpdate: (value: BlockData, type?: BlockType) => void
}
