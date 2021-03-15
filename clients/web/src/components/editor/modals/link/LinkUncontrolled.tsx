import OptionControls, { IOptionElements, IOptionSections, OptionType } from 'components/common/option-controls'
import TextInput from 'components/common/text-input/TextInput'
import { useTranslation } from 'next-i18next'
import { CSSProperties, forwardRef, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { updateBoundedPosition } from 'utils/modals/updateBoundedPosition'
import mergeRefs from 'utils/refs/mergeRefs'
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

const LinkUncontrolled = forwardRef<HTMLDivElement, IProps>(
  ({ rootRef, position, sections, filterText, onDismiss, onValueChange, onItemClick }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      updateBoundedPosition(rootRef, ref, position, 'below')
    }, [ref, rootRef, position])

    return (
      <OptionControls
        style={{ left: position.x, top: position.y }}
        ref={mergeRefs(forwardedRef, ref)}
        className={styles.container}
        sections={sections}
        header={<Header filterText={filterText} onValueChange={onValueChange} />}
        onItemClick={onItemClick}
        onDismiss={onDismiss}
      />
    )
  }
)

export default LinkUncontrolled

interface IProps {
  rootRef: RefObject<HTMLDivElement> | undefined
  position: { x: number; y: number }
  sections: IOptionSections[]
  filterText: string | null
  onDismiss: () => void
  onValueChange: (value: string) => void
  onItemClick: (sectionId: number, id: number) => void
}
