import { useCallback, useRef, useState, ReactNode, HTMLProps, forwardRef } from 'react'
import useWindowKeyDown from 'utils/hooks/useWindowKeyDown'
import styles from './OptionControls.module.scss'
import findIndex from 'lodash/findIndex'
import flatten from 'lodash/flatten'
import Section from './Section'
import mergeRefs from 'utils/refs/mergeRefs'
import useOnDismiss from 'utils/hooks/useOnDismiss'

export enum OptionType {
  Button = 1,
  Line,
  Switch,
  Header,
}

export interface IOptionHeader {
  type: OptionType.Header
  title: string
}

export interface IOptionButton {
  id: number
  type: OptionType.Button
  title: string
  icon?: ReactNode
  subtitle?: string
  hint?: string
  iconSize?: 'large' | 'normal'
}

interface IOptionLine {
  type: OptionType.Line
}

interface IOptionSwitch {
  id: number
  title: string
  state: boolean
  type: OptionType.Switch
}

export type IOptionElements = IOptionButton | IOptionSwitch

export type IOptionSections = {
  id: number
  title?: string
  items: IOptionElements[]
  showLine?: boolean
}

const OptionControls = forwardRef<HTMLDivElement, IProps>(
  ({ header, footer, sections, iconClassName, onItemClick, onDismiss, ...otherProps }, forwardedRef) => {
    const [selectedIndex, setSelected] = useState<number>(0)

    const itemRefs = useRef<HTMLDivElement[]>([])
    const actionItems = flatten(sections.map((section) => section.items.map((item) => ({ ...item, sectionId: section.id }))))

    const scrollIntoView = useCallback(
      (index: number) => {
        const ref = itemRefs.current[index]
        if (!ref) {
          return
        }
        ref.scrollIntoView(false)
      },
      [itemRefs.current]
    )

    const _onItemMouseEnter = useCallback(
      (sectionId: number, id: number) => {
        const index = findIndex(actionItems, (item) => item.id === id)
        setSelected(index)
      },
      [actionItems]
    )

    const _onMouseLeave = useCallback((id) => {
      setSelected(-1)
    }, [])

    const _onItemClick = useCallback(
      (sectionId, id) => {
        onDismiss()
        onItemClick(sectionId, id)
      },
      [onItemClick, onDismiss]
    )

    const _onSwitchClick = useCallback(
      (sectionId, id) => {
        onItemClick(sectionId, id)
      },
      [onItemClick]
    )

    useWindowKeyDown(
      'Enter',
      (e) => {
        const selectedItem = actionItems[selectedIndex]
        if (!selectedItem) {
          return
        }
        onDismiss()
        onItemClick(selectedItem.sectionId, selectedItem.id)
        e.preventDefault()
        e.stopPropagation()
      },
      [onItemClick, actionItems, selectedIndex]
    )

    useWindowKeyDown(
      'ArrowUp',
      (e) => {
        const index = selectedIndex > -1 ? selectedIndex - 1 : -1
        setSelected(index)
        scrollIntoView(index)
        e.preventDefault()
        e.stopPropagation()
      },
      [scrollIntoView, selectedIndex]
    )

    useWindowKeyDown(
      'ArrowDown',
      (e) => {
        const index = selectedIndex < actionItems.length - 1 ? selectedIndex + 1 : actionItems.length - 1

        setSelected(index)
        scrollIntoView(index)
        e.preventDefault()
        e.stopPropagation()
      },
      [scrollIntoView, actionItems, selectedIndex]
    )

    const ref = useRef<HTMLDivElement>(null)

    useOnDismiss(ref, () => {
      onDismiss()
    })

    const onInnerRefCallback = (ref: HTMLDivElement, id: number) => {
      const index = findIndex(actionItems, (item) => item.id === id)
      itemRefs.current[index] = ref
    }

    return (
      <div className={styles.defaultContainer} onMouseLeave={_onMouseLeave} {...otherProps} ref={mergeRefs(forwardedRef, ref)}>
        {header}
        {sections.map((section, i) => {
          return (
            <Section
              key={`${i}`}
              {...section}
              // TODO: Change inner ref
              onInnerRefCallback={onInnerRefCallback}
              selectedId={actionItems[selectedIndex]?.id}
              iconClassName={iconClassName}
              onItemClick={_onItemClick}
              onItemMouseEnter={_onItemMouseEnter}
              onSwitchClick={_onSwitchClick}
            />
          )
        })}
        {footer}
      </div>
    )
  }
)

export default OptionControls

interface IProps extends HTMLProps<HTMLDivElement> {
  sections: IOptionSections[]
  header?: ReactNode
  footer?: ReactNode
  iconClassName?: string
  onItemClick: (sectionId: number, id: number) => void
  onDismiss: () => void
}
