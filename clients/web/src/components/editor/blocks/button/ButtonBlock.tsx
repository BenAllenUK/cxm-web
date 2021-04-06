import styles from './ButtonBlock.module.scss'
import Button from 'components/common/button/Button'
import TextInput from 'components/common/text-input/TextInput'
import { useState } from 'react'
import MediaSelector from 'components/editor/modals/media/MediaSelector'
import TopBar from 'components/editor/modals/media-controls/TopBar'
import { BlockDataButton, BlockData, BlockType, MediaSourceType, MediaSourceObject } from '../types'

const ButtonBlock = ({ content, onUpdate, onDeleteBlock }: IProps) => {
  const [buttonText, setButtonText] = useState(content.text)
  const [showSelector, setShowSelector] = useState(false)
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

  const _onUpdate = (value: BlockData) => {
    setShowSelector(!showSelector)
    onUpdate({ ...content, ...value }, BlockType.BUTTON)
  }

  let sources: MediaSourceObject[] = [{ name: 'Embed Link', type: MediaSourceType.EMBED_LINK }]

  return (
    <div className={styles.container}>
      <div className={styles.mediaControls}>
        <TopBar addLink={() => setShowSelector(!showSelector)} onDeleteBlock={onDeleteBlock} isButton />
      </div>
      <Button className={styles.button} onClick={() => openUrl()}>
        <TextInput
          focusedPlaceholder={''}
          blurredPlaceholder={''}
          html={buttonText}
          onChange={onTextChange}
          className={styles.textInput}
        />
      </Button>
      {showSelector && <MediaSelector onUpdate={_onUpdate} sources={sources} isButton />}
    </div>
  )
}

export default ButtonBlock

interface IProps {
  content: BlockDataButton
  onDeleteBlock: () => void
  onUpdate: (value: BlockData, type?: BlockType) => void
}
