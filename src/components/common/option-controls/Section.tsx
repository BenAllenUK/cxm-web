import { memo } from 'react'
import Button from './Button'
import Header from './Header'
import { IOptionElements, OptionType } from './index'
import Line from './Line'
import Switch from './Switch'

const OptionSection = ({
  innerRef,
  selectedId,
  iconClassName,
  items,
  filterText,
  title,
  showLine,
  onClick,
  onSwitchClick,
  onItemMouseEnter,
}: ISecProps) => {
  return (
    <>
      {title && <Header title={title} />}

      {items.map((item, i) => {
        switch (item.type) {
          case OptionType.Button:
            return (
              <Button
                key={i}
                innerRef={innerRef}
                iconClassName={iconClassName}
                selected={item.id === selectedId}
                onClick={onClick}
                onMouseEnter={onItemMouseEnter}
                {...item}
              />
            )
          case OptionType.Switch:
            return (
              <Switch
                key={i}
                selected={item.id === selectedId}
                onClick={onSwitchClick}
                onMouseEnter={onItemMouseEnter}
                {...item}
              />
            )

          default:
            return <div />
        }
      })}

      {showLine && <Line />}
    </>
  )
}

export default memo(OptionSection)

interface ISecProps {
  innerRef: any
  items: IOptionElements[]
  title?: string
  filterText?: string
  showLine?: boolean
  selectedId?: number
  iconClassName?: string
  onClick: (id: number) => void
  onSwitchClick: (id: number) => void
  onItemMouseEnter: (id: number) => void
}
