import './List.module.scss'
import { BlockDataText, BlockType } from '../../../types'
import TextInput from '../../common/text-input/TextInput'
import Text from '../blocks/Text'
import {
  forwardRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef
} from 'react'
//import CheckboxEmpty from 'images/icons/checkbox.svg'
//import CheckboxFilled from 'images/icons/checkbox-filled.svg'

const Item = forwardRef<HTMLDivElement, IItemProps>(
  ({ selected, type, focus, index, value, onSelectedToggle }, parentRef) => {
    // const ref = useRef<HTMLDivElement>(null)

    const _onSelectedToggle = (e: any) => {
      onSelectedToggle(index)
      e.stopPropagation()
    }

    // useEffect(() => {
    //   if (focus && ref?.current) {
    //     ref.current.focus()
    //   }
    // }, [focus])

    return (
      <li className={'omnea-content-list-item'}>
        <div className={'omnea-content-list-item-container'}>
          {type === BlockType.LIST_CHECK && (
            <div
              className={'omnea-content-item-checkbox'}
              onClick={_onSelectedToggle}
            >
              <div
                className={`${'omnea-content-item-checkbox-inner'} ${
                  selected ? 'omnea-content-item-checkbox-inner-filled' : ''
                }`}
              >
                {/* {selected ? (
                  <CheckboxFilled className={'omnea-content-item-checkbox-filled'} />
                ) : (
                  <CheckboxEmpty className={'omnea-content-item-checkbox-unfilled'} />
                )} */}
              </div>
              {/* {selected && <FontAwesomeIcon style={{ fontSize: 13, paddingTop: 1 }} icon={faCheck} />} */}
            </div>
          )}
          <Text
            type={BlockType.TEXT}
            content={{ value: value } as BlockDataText}
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
}

const List = ({ items, type }: IProps) => {
  let focusIndex = 0 //needs to be hook
  const onSelectedToggle = () => {
    return null
  }
  return (
    <div className={'omnea-content-list-container'}>
      <ul className={'omnea-content-list'}>
        {items?.map(
          (item: { value: string; selected?: boolean }, i: number) => {
            return (
              <Item
                type={type}
                focus={focusIndex == i}
                key={i}
                index={i}
                value={item.value}
                selected={item.selected}
                onSelectedToggle={onSelectedToggle}
              />
            )
          }
        )}
      </ul>
    </div>
  )
}

export default List

interface IProps {
  type: BlockType
  items?: { value: string; selected?: boolean }[]
  focus?: boolean
  tabIndex?: number
  filteringMode?: boolean
  disabled?: boolean
}
