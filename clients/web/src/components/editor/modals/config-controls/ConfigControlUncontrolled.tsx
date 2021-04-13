import SettingsControls, { IOptionElements, OptionType } from 'components/common/settings-controls'
import { BlockTypeProperties } from 'components/editor/blocks'
import Image from 'next/image'
import { CSSProperties } from 'react'
import styles from './ConfigControlUncontrolled.module.scss'

const ConfigControlUncontrolled = ({ style, onClick, onDismiss }: IProps) => {
  let items: IOptionElements[] = Object.values(BlockTypeProperties).map((item, i) => ({
    id: item.id,
    icon: <Image priority loading={'eager'} className={styles.image} width={46} height={46} src={item.image} />,
    title: item.title,
    subtitle: item.subtitle,
    type: OptionType.Button,
  }))

  const _onClick = (_: number, itemId: number) => {
    onClick(itemId)
  }
  console.log('rendering uncontrolled')
  return (
    <>
      {items.length > 0 && (
        <SettingsControls
          sections={[{ id: -1, items: items, title: 'Basic Blocks' }]}
          style={style}
          iconClassName={styles.icon}
          onItemClick={_onClick}
          onDismiss={onDismiss}
        />
      )}
    </>
  )
}

export default ConfigControlUncontrolled

interface IProps {
  style: CSSProperties
  onClick: (key: number) => void
  onDismiss: () => void
}
