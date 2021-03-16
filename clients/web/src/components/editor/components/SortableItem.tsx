import { forwardRef } from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { BlockTypeProperties } from '../blocks'
import { Block } from '../blocks/types'

import Container from '../blocks/core/Container'

import Item from './Item'
import { IItemHandlerProps } from './Item'

const SortableItem = (props: IProps) => {
  const {
    focusIndex,
    item,
    modalBlockEnabled,
    itemRefFunc,
    onBlockClick,
    onBlockAddClick,
    onBlockDoubleClick,
    ...itemHandlers
  } = props

  const _refCallback = (ref: HTMLDivElement) => {
    itemRefFunc(ref, item.position)
  }

  return (
    <SortableItemRoot index={item.position}>
      <Container
        index={item.position}
        initialHeight={BlockTypeProperties[item.type].initialHeight}
        enableHandle={!modalBlockEnabled}
        onClick={onBlockClick}
        onAddClick={onBlockAddClick}
        onDoubleClick={onBlockDoubleClick}
        onUpdate={itemHandlers.onUpdate}
        onImageUpdate={itemHandlers.onImageUpdate}
        id={item.id}
      >
        <div ref={_refCallback}>
          <Item
            index={item.position}
            focus={focusIndex === item.position}
            blockControlOpen={modalBlockEnabled}
            type={item.type}
            payload={item.payload}
            id={item.id}
            {...itemHandlers}
          />
        </div>
      </Container>
    </SortableItemRoot>
  )
}

const ItemContainer = ({ children }: any) => children

const SortableItemRoot = SortableElement(ItemContainer)

interface IProps extends ISortableItemHandlerProps {
  itemRefFunc: (ref: HTMLDivElement, position: number) => void
  modalBlockEnabled: boolean
  focusIndex: number
  item: Block
}

export interface ISortableItemHandlerProps extends IItemHandlerProps {
  onBlockClick: (index: number) => void
  onBlockAddClick: (index: number) => void
  onBlockDoubleClick: (index: number, pos: { x: number; y: number }) => void
}

export default SortableItem
