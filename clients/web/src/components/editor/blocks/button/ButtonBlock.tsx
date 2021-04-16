import styles from './ButtonBlock.module.scss'
import Button from 'components/common/button/Button'
import TextInput from 'components/common/text-input/TextInput'
import { useState } from 'react'
import FileSelection from 'components/editor/modals/file-selection'
import TopBar from 'components/editor/modals/file-controls/FileControlsUncontrolled'
import { BlockDataButton, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'
import { useFileControlModal } from 'components/editor/modals/file-more-controls'

const ButtonBlock = ({ content, onUpdate, onDeleteBlock }: IProps) => {
  const [buttonText, setButtonText] = useState(content.text)
  const { showControls } = useFileControlModal()

  const onTextChange = (e: any) => {
    setButtonText(e.target.value)
    onUpdate({ ...content, text: e.target.value }, BlockType.BUTTON)
  }

  const openUrl = () => {
    if (content.value) {
      const newWindow = window.open(content.value, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
    }
  }

  const _onShow = () => {
    showControls({ x: 0, y: 0 }, { blockId: 1 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.mediaControls}>
        <TopBar onAddLink={() => _onShow()} onDeleteBlock={onDeleteBlock} isButton />
      </div>
      <Button className={styles.button} onClick={() => openUrl()}>
        <TextInput
          focusedPlaceholder={''}
          blurredPlaceholder={''}
          html={buttonText}
          onChange={onTextChange}
          className={styles.textInput}
          useInnerText
        />
      </Button>
    </div>
  )
}

export default ButtonBlock

interface IProps {
  content: BlockDataButton
  onDeleteBlock: () => void
  onUpdate: (value: BlockData, type?: BlockType) => void
}
