import { BlockDataTextInput } from '../../../types'
import TextInputComponent from '../../common/text-input/TextInput'
import './TextInput.module.scss'

const TextInput = ({ content }: IProps) => {
  let input = content.value

  const onTextChange = (e: any) => {
    input = e.target.value
  }
  return (
    <div>
      <TextInputComponent
        focusedPlaceholder={content.value}
        blurredPlaceholder={content.value}
        html={input}
        onChange={onTextChange}
        className={'omnea-content-text-input'}
      />
    </div>
  )
}

export default TextInput

interface IProps {
  content: BlockDataTextInput
}
