import styles from './List.module.scss'
import { BlockType } from '../types'
import TextInput, { TextInputEvent } from 'components/common/text-input/TextInput'
import useKeyDown from 'utils/hooks/useKeyDown'
import { forwardRef, MouseEvent, useEffect, useRef } from 'react'
import mergeRefs from 'utils/refs/mergeRefs'
import CheckboxEmpty from 'images/icons/checkbox.svg'
import CheckboxFilled from 'images/icons/checkbox-filled.svg'

const Item = forwardRef<HTMLDivElement, IItemProps>(
  ({ selected, type, focus, index, value, onDelete, onNew, onTextChange, onFocus, onBlur, onSelectedToggle }, parentRef) => {
    const ref = useRef<HTMLDivElement>(null)

    useKeyDown(
      'Backspace',
      ref,
      (e) => {
        if (!value && !e.shiftKey) {
          e.preventDefault()
          onDelete(index)
        }
      },
      [onDelete, index]
    )

    useKeyDown(
      'Enter',
      ref,
      (e) => {
        if (!e.shiftKey) {
          e.preventDefault()
          onNew(index)
        }
      },
      [onNew, index]
    )

    const _onTextChange = (e: TextInputEvent) => {
      onTextChange(index, e.target.value)
    }

    const _onFocus = () => {
      onFocus(index)
    }

    const _onBlur = () => {
      onBlur(index)
    }

    const _onSelectedToggle = (e: MouseEvent) => {
      onSelectedToggle(index)
      e.stopPropagation()
    }

    useEffect(() => {
      if (focus && ref?.current) {
        ref.current.focus()
      }
    }, [focus])

    return (
      <li className={styles.listItem}>
        <div className={styles.listItemContainer}>
          {type === BlockType.LIST_CHECK && (
            <div className={styles.itemCheckbox} onClick={_onSelectedToggle}>
              <div className={`${styles.itemCheckboxInner} ${selected ? styles.itemCheckboxInnerFilled : ''}`}>
                {selected ? (
                  <CheckboxFilled className={styles.itemCheckboxFilled} />
                ) : (
                  <CheckboxEmpty className={styles.itemCheckboxUnfilled} />
                )}
              </div>
              {/* {selected && <FontAwesomeIcon style={{ fontSize: 13, paddingTop: 1 }} icon={faCheck} />} */}
            </div>
          )}
          {type === BlockType.LIST_NUMBER && (
            <div className={styles.itemNumber}>
              <span>{index + 1}.</span>
            </div>
          )}
          {type === BlockType.LIST_BULLET && (
            <div className={styles.itemBullet}>
              <span>&#9679;</span>
            </div>
          )}
          <TextInput
            // focusedPlaceholder={focusedPlaceholder}
            // blurredPlaceholder={blurredPlaceholder}
            // tabIndex={tabIndex}
            className={styles.textInput}
            html={value || ''}
            ref={mergeRefs(ref, parentRef)}
            onChange={_onTextChange}
            onFocus={_onFocus}
            onBlur={_onBlur}
            useInnerHtml
          />
        </div>
      </li>
    )
  }
)

interface IItemProps {
  type: BlockType
  focus: boolean
  index: number
  value: string
  selected?: boolean
  onSelectedToggle: (i: number) => void
  onDelete: (i: number) => void
  onNew: (i: number) => void
  onTextChange: (i: number, value: string) => void
  onFocus: (i: number) => void
  onBlur: (i: number) => void
}

const List = ({ focusIndex, items, type, onTextChange, onFocus, onBlur, onDelete, onNew, onSelectedToggle }: IProps) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items?.map((item, i) => {
          return (
            <Item
              type={type}
              focus={focusIndex == i}
              key={i}
              index={i}
              value={item.value}
              selected={item.selected}
              onSelectedToggle={onSelectedToggle}
              onTextChange={onTextChange}
              onFocus={onFocus}
              onBlur={onBlur}
              onDelete={onDelete}
              onNew={onNew}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default List

interface IProps {
  focusIndex: number
  type: BlockType
  items?: { value: string; selected?: boolean }[]
  focus?: boolean
  tabIndex?: number
  filteringMode?: boolean
  disabled?: boolean
  onSelectedToggle: (i: number) => void
  onTextChange: (i: number, value: string) => void
  onNew: (i: number) => void
  onDelete: (i: number) => void
  onFocus: (i: number) => void
  onBlur: (i: number) => void
}
