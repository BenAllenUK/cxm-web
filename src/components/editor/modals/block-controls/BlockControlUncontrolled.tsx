import OptionControls, { IOptionElements, OptionType } from 'components/common/option-controls'
import { BlockTypeProperties } from 'components/editor/blocks'
import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from './BlockControlUncontrolled.module.scss'

const BlockControlUncontrolled = ({ filterText, style, onClick, onDismiss }: IProps) => {
  let items: IOptionElements[] = Object.values(BlockTypeProperties).map((item, i) => ({
    id: item.id,
    icon: <Image className={styles.image} width={46} height={46} src={item.image} />,
    title: item.title,
    subtitle: item.subtitle,
    type: OptionType.Button,
  }))

  if (filterText) {
    const formattedFilterText = filterText.toLowerCase().replace('/', '')
    items = items.filter((item) => item.title.toLowerCase().indexOf(formattedFilterText) > -1)
  }

  const _onClick = (sectionId: number, itemId: number) => {
    onClick(itemId)
  }

  return (
    <OptionControls
      sections={[{ id: -1, items: items, title: 'Basic Blocks' }]}
      style={style}
      iconClassName={styles.icon}
      onItemClick={_onClick}
      onDismiss={onDismiss}
    />
  )
}

export default BlockControlUncontrolled

interface IProps {
  filterText: string | null
  style: CSSProperties
  onClick: (key: number) => void
  onDismiss: () => void
}
