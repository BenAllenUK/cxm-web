import { MouseEvent } from 'react'
import { SortableContainer, SortEnd } from 'react-sortable-hoc'
import { Tooltip } from 'components/common/tooltip'

import { Block } from '../blocks/types'

import styles from '../Editor.module.scss'
import SortableItem, { ISortableItemHandlerProps } from './SortableItem'

const SortableList = (props: IProps) => {
  const { itemRefFunc, modalBlockEnabled, focusIndex, blocks, onBodyClick, onSortEnd, ...otherProps } = props

  return (
    <div className={styles.body} onClick={onBodyClick}>
      <div onClick={(e) => e.stopPropagation()}>
        <SortableListRoot onSortEnd={onSortEnd} useDragHandle={true}>
          {blocks
            .sort((a: Block, b: Block) => a.position - b.position)
            .map((item) => {
              return (
                <SortableItem
                  itemRefFunc={itemRefFunc}
                  focusIndex={focusIndex}
                  modalBlockEnabled={modalBlockEnabled}
                  key={`${item.id}-${item.position}`}
                  item={item}
                  {...otherProps}
                />
              )
            })}
        </SortableListRoot>
        <Tooltip id={'editor'} />
      </div>
    </div>
  )
}

const StyledList = ({ children }: any) => <div className={styles.list}>{children}</div>

const SortableListRoot = SortableContainer(StyledList)

interface IProps extends ISortableItemHandlerProps {
  itemRefFunc: (ref: HTMLDivElement, position: number) => void
  modalBlockEnabled: boolean
  focusIndex: number
  blocks: Block[]
  onBodyClick: (e: MouseEvent) => void
  onSortEnd: ({ oldIndex, newIndex }: SortEnd) => void
}

export default SortableList
