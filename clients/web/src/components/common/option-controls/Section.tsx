import { memo } from 'react'
import Button from './Button'
import Header from './Header'
import { IOptionElements, OptionType } from './index'
import Line from './Line'
import Switch from './Switch'

const OptionSection = ({
  id: sectionId,
  selectedId,
  iconClassName,
  items,
  title,
  showLine,
  onInnerRefCallback,
  onItemClick,
  onSwitchClick,
  onItemMouseEnter,
}: ISecProps) => {
  const _onItemClick = (id: number) => {
    onItemClick(sectionId, id)
  }

  const _onItemMouseEnter = (id: number) => {
    onItemMouseEnter(sectionId, id)
  }

  const _onSwitchClick = (id: number) => {
    onSwitchClick(sectionId, id)
  }
  return (
    <>
      {items.length > 0 && title && <Header title={title} />}

      {items.map((item, i) => {
        switch (item.type) {
          case OptionType.Button:
            return (
              <Button
                key={i}
                onInnerRefCallback={onInnerRefCallback}
                iconClassName={iconClassName}
                selected={item.id === selectedId}
                onClick={_onItemClick}
                onMouseEnter={_onItemMouseEnter}
                {...item}
              />
            )
          case OptionType.Switch:
            return (
              <Switch
                key={i}
                selected={item.id === selectedId}
                onClick={_onSwitchClick}
                onMouseEnter={_onItemMouseEnter}
                {...item}
              />
            )

          default:
            return <div />
        }
      })}

      {items.length > 0 && showLine && <Line />}
    </>
  )
}

export default memo(OptionSection)

interface ISecProps {
  id: number
  items: IOptionElements[]
  title?: string
  showLine?: boolean
  selectedId?: number
  iconClassName?: string
  onInnerRefCallback: (ref: HTMLDivElement, id: number) => void
  onItemClick: (sectionId: number, id: number) => void
  onSwitchClick: (sectionId: number, id: number) => void
  onItemMouseEnter: (sectionId: number, id: number) => void
}
