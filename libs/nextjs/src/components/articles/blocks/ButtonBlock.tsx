import './ButtonBlock.module.scss'
import { BlockDataButton } from '../../../types'
import Button from '../../common/button/Button'

const ButtonBlock = ({ content }: IProps) => {
  const onClick = () => {
    if (content.value) {
      const newWindow = window.open(
        content.value,
        '_blank',
        'noopener,noreferrer'
      )
      if (newWindow) newWindow.opener = null
    }
  }
  return (
    <div>
      <Button style={{ color: 'black' }} onClick={onClick}>
        {content.text}
      </Button>
    </div>
  )
}

export default ButtonBlock

interface IProps {
  content: BlockDataButton
}
