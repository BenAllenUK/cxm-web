import { memo, useCallback, useRef, useState, ReactNode } from 'react'
import { useOnClickOutside, useWindowKeyDown } from 'utils/hooks'
import Button from './Button'
import Line from './Line'
import styles from './OptionControls.module.scss'
import findIndex from 'lodash/findIndex'
import Switch from './Switch'
import Header from './Header'

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

type IOptionActionElements = IOptionButton | IOptionSwitch
type IOptionNonActionElements = IOptionLine | IOptionHeader

export type IOptionElements = IOptionNonActionElements | IOptionActionElements

// , hint: null, icon: null, size: 'NORMAL'
const items1 = [
  { id: 1, type: OptionType.Switch, title: 'Small text', state: false },
  { id: 2, type: OptionType.Switch, title: 'Full width', state: false },
  { type: OptionType.Line },
  { id: 3, type: OptionType.Button, title: 'Customize page' },
  { id: 4, type: OptionType.Button, title: 'Lock page' },
  { type: OptionType.Line },
  { id: 5, type: OptionType.Button, title: 'Add to favorites' },
  { id: 6, type: OptionType.Button, title: 'Copy link', hint: '⌘ + L' },
  { type: OptionType.Line },
  { id: 7, type: OptionType.Button, title: 'Undo', hint: '⌘ + Z' },
  { id: 8, type: OptionType.Button, title: 'Page history' },
  { id: 9, type: OptionType.Button, title: 'Show delete pages' },
  { id: 10, type: OptionType.Button, title: 'Delete' },
  { type: OptionType.Line },
  { id: 11, type: OptionType.Button, title: 'Import' },
  { id: 12, type: OptionType.Button, title: 'Export', subtitle: 'PDF, HTML, Markdown' },
  { type: OptionType.Line },
  { id: 13, type: OptionType.Button, title: 'Move to', subtitle: '⌘ + Shift + P' },
  { type: OptionType.Line },
]

const OptionControls = ({ items, position, filterText, className, iconClassName, onClick, onDismiss }: IProps) => {
  const [selectedIndex, setSelected] = useState<number>(0)

  const itemRefs = useRef<HTMLDivElement[]>([])

  const controls = items.filter((item) => item.type !== OptionType.Line) as IOptionActionElements[]

  const filteredControls = filterText ? controls.filter((item) => item.title?.indexOf(filterText)) : controls
  const filteredControlsLength = filteredControls.length

  useWindowKeyDown(
    'Enter',
    useCallback(
      (e) => {
        const selectedItem = filteredControls[selectedIndex] as IOptionActionElements
        if (!selectedIndex) {
          return
        }

        onClick(selectedItem.id)
        e.preventDefault()
      },
      [filteredControls, selectedIndex]
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
      const index = selectedIndex < filteredControlsLength - 1 ? selectedIndex + 1 : filteredControlsLength - 1

      setSelected(index)

      scrollIntoView(index)
    },
    [filteredControlsLength, selectedIndex]
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
      const index = findIndex(filteredControls, (item) => item.id === id)
      setSelected(index)
    },
    [filteredControls]
  )

  const _onMouseLeave = useCallback((id) => {
    setSelected(-1)
  }, [])

  const _onClick = useCallback((id) => {
    onDismiss()
    onClick(id)
  }, [])

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    onDismiss()
  })

  if (filteredControls.length === 0) {
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
      {items.map((item, i) => {
        switch (item.type) {
          case OptionType.Header:
            return <Header title={item.title} />
          case OptionType.Button:
            return (
              <Button
                key={i}
                innerRef={(ref: any) => {
                  if (ref) {
                    itemRefs.current[i] = ref
                  }
                }}
                iconClassName={iconClassName}
                selected={item.id === filteredControls[selectedIndex]?.id}
                onClick={_onClick}
                onMouseEnter={_onItemMouseEnter}
                {...item}
              />
            )
          case OptionType.Switch:
            return (
              <Switch
                key={i}
                selected={item.id === filteredControls[selectedIndex]?.id}
                onClick={_onClick}
                onMouseEnter={_onItemMouseEnter}
                {...item}
              />
            )
          case OptionType.Line:
            return <Line key={i} />
          default:
            return <div />
        }
      })}
    </div>
  )
}

export default memo(OptionControls)

interface IProps {
  items: Array<IOptionElements>
  className?: string
  iconClassName?: string
  position: { x: number; y: number }
  filterText?: string | null
  onClick: (id: number) => void
  onDismiss: () => void
}
