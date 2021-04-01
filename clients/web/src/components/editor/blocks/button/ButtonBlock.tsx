import styles from './ButtonBlock.module.scss'
import Button from 'components/common/button/Button'
import TextInput from 'components/common/text-input/TextInput'
import { useState } from 'react'
import { BlockDataButton, BlockData, BlockType } from '../types'

const ButtonBlock = ({ content, onUpdate }: IProps) => {
  const [buttonText, setButtonText] = useState('')

  const onTextChange = (e: any) => {
    setButtonText(e.target.value)
    onUpdate({ ...content, text: e.target.value }, BlockType.BUTTON)
  }

  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={() => null}>
        <TextInput
          focusedPlaceholder={''}
          blurredPlaceholder={''}
          html={buttonText}
          onChange={onTextChange}
          className={styles.textInput}
        />
      </Button>
    </div>
  )
}

export default ButtonBlock

interface IProps {
  content: BlockDataButton
  onUpdate: (value: BlockData, type?: BlockType) => void
}
