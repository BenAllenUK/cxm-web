import { memo, useCallback, useRef, useState, ReactNode } from 'react'
import { useOnClickOutside, useWindowKeyDown } from 'utils/hooks'
import styles from './OptionControls.module.scss'
import findIndex from 'lodash/findIndex'
import flatten from 'lodash/flatten'
import Section from './Section'

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
  title?: string
  items: IOptionElements[]
  showLine?: boolean
}

const OptionControls = ({ sections, position, className, iconClassName, onClick, onDismiss }: IProps) => {
  const [selectedIndex, setSelected] = useState<number>(0)

  const itemRefs = useRef<HTMLDivElement[]>([])
  const actionItems = flatten(sections.map((section) => section.items))

  useWindowKeyDown(
    'Enter',
    useCallback(
      (e) => {
        const selectedItem = actionItems[selectedIndex] as IOptionElements
        if (!selectedIndex) {
          return
        }

        onClick(selectedItem.id)
        e.preventDefault()
      },
      [actionItems, selectedIndex]
    )
  )

  useWindowKeyDown(
    'ArrowUp',
    (_) => {
      const index = selectedIndex > -1 ? selectedIndex - 1 : -1
      setSelected(index)
      scrollIntoView(index)
    },
    [selectedIndex]
  )

  useWindowKeyDown(
    'ArrowDown',
    (_) => {
      const index = selectedIndex < actionItems.length - 1 ? selectedIndex + 1 : actionItems.length - 1

      setSelected(index)

      scrollIntoView(index)
    },
    [actionItems, selectedIndex]
  )

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
    (id: number) => {
      const index = findIndex(actionItems, (item) => item.id === id)
      setSelected(index)
    },
    [actionItems]
  )

  const _onMouseLeave = useCallback((id) => {
    setSelected(-1)
  }, [])

  const _onClick = useCallback((id) => {
    onDismiss()
    onClick(id)
  }, [])

  const _onSwitchClick = useCallback((id) => {
    onClick(id)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    onDismiss()
  })

  if (sections.length === 0) {
    return <div />
  }

  return (
    <div
      ref={ref}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseLeave={_onMouseLeave}
      className={className || styles.defaultContainer}
    >
      {sections.map((section, i) => {
        return (
          <Section
            key={`${i}`}
            {...section}
            innerRef={(ref: any) => {
              if (ref) {
                itemRefs.current[i] = ref
              }
            }}
            selectedId={actionItems[selectedIndex]?.id}
            iconClassName={iconClassName}
            onClick={_onClick}
            onItemMouseEnter={_onItemMouseEnter}
            onSwitchClick={_onSwitchClick}
          />
        )
      })}
    </div>
  )
}

export default memo(OptionControls)

interface IProps {
  sections: IOptionSections[]
  className?: string
  iconClassName?: string
  position: { x: number; y: number }
  onClick: (id: number) => void
  onDismiss: () => void
}
