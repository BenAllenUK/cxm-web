import OptionControls, { IOptionSections, OptionType } from 'components/common/option-controls'
import { CSSProperties } from 'react'
import { useTranslation } from 'config/translation'
import styles from './TextStyle.module.scss'

export const textColorOptions = [
  { id: 0, key: 'default', color: 'rgb(55, 53, 47)' },
  { id: 1, key: 'gray', color: 'rgba(55, 53, 47, 0.6)' },
  { id: 2, key: 'brown', color: 'rgb(100, 71, 58)' },
  { id: 3, key: 'orange', color: 'rgb(217, 115, 13)' },
  { id: 4, key: 'yellow', color: 'rgb(223, 171, 1)' },
  { id: 5, key: 'green', color: 'rgb(15, 123, 108)' },
  { id: 6, key: 'blue', color: 'rgb(11, 110, 153)' },
  { id: 7, key: 'purple', color: 'rgb(105, 64, 165)' },
  { id: 8, key: 'pink', color: 'rgb(173, 26, 114)' },
  { id: 9, key: 'red', color: 'rgb(224, 62, 62)' },
]

export const backgroundColorOptions = [
  { id: 10, key: 'default', color: 'none' },
  { id: 11, key: 'gray', color: 'rgb(235, 236, 237)' },
  { id: 12, key: 'brown', color: 'rgb(233, 229, 227)' },
  { id: 13, key: 'orange', color: 'rgb(250, 235, 221)' },
  { id: 14, key: 'yellow', color: 'rgb(251, 243, 219)' },
  { id: 15, key: 'green', color: 'rgb(221, 237, 234)' },
  { id: 16, key: 'blue', color: 'rgb(221, 235, 241)' },
  { id: 17, key: 'purple', color: 'rgb(234, 228, 242)' },
  { id: 18, key: 'pink', color: 'rgb(244, 223, 235)' },
  { id: 19, key: 'red', color: 'rgb(251, 228, 228)' },
]

const ColorIcon = ({ color, isHighlight }: IColorIconProps) => {
  return (
    <div className={styles.colorIcon} style={isHighlight ? { backgroundColor: color } : { color: color }}>
      A
    </div>
  )
}

interface IColorIconProps {
  color: string
  isHighlight: boolean
}

const TextStyleUncontrolled = ({ style, onDismiss, onClick }: IProps) => {
  const { t } = useTranslation(['editor'])
  const sections: IOptionSections[] = [
    {
      id: 0,
      title: t('textStyles.colorTitle'),
      items: textColorOptions.map((item) => ({
        id: item.id,
        icon: <ColorIcon color={item.color} isHighlight={false} />,
        type: OptionType.Button,
        title: t(`textStyles.colors.${item.key}`),
      })),
    },
    {
      id: 1,
      title: t('textStyles.backgroundTitle'),
      items: backgroundColorOptions.map((item) => ({
        id: item.id,
        icon: <ColorIcon color={item.color} isHighlight={true} />,
        type: OptionType.Button,
        title: t(`textStyles.backgrounds.${item.key}`),
      })),
    },
  ]

  return (
    <OptionControls sections={sections} style={style} iconClassName={styles.icon} onItemClick={onClick} onDismiss={onDismiss} />
  )
}

export default TextStyleUncontrolled

interface IProps {
  style: CSSProperties
  onDismiss: () => void
  onClick: (id: number) => void
}
