import OptionControls, { IOptionElements, IOptionSections, OptionType } from 'components/common/option-controls'
import TextInput from 'components/common/text-input/TextInput'
import { useTranslation } from 'config/translation'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import styles from './LinkUncontrolled.module.scss'

const Header = ({ filterText, onValueChange }: IHeaderProps) => {
  const inputRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation(['editor'])

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
      document.execCommand('selectAll', false)
    }
  }, [inputRef])

  return (
    <div className={styles.inputContainer}>
      <TextInput
        className={styles.textInput}
        html={filterText || ''}
        focusedPlaceholder={t('link.placeholder')}
        blurredPlaceholder={t('link.placeholder')}
        ref={inputRef}
        onChange={(e: any) => onValueChange(e.target.value)}
      />
    </div>
  )
}

interface IHeaderProps {
  filterText: string | null
  onValueChange: (value: string) => void
}

const LinkUncontrolled = ({ sections, filterText, style, onDismiss, onValueChange, onItemClick }: IProps) => {
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
      document.execCommand('selectAll', false)
    }
  }, [inputRef])

  return (
    <OptionControls
      style={style}
      className={styles.container}
      sections={sections}
      header={<Header filterText={filterText} onValueChange={onValueChange} />}
      onItemClick={onItemClick}
      onDismiss={onDismiss}
    />
  )
}

export default LinkUncontrolled

interface IProps {
  style?: CSSProperties
  sections: IOptionSections[]
  filterText: string | null
  onDismiss: () => void
  onValueChange: (value: string) => void
  onItemClick: (sectionId: number, id: number) => void
}
