import OptionControls, { OptionType, IOptionSections } from 'components/common/option-controls'
import styles from './FileMoreControlsUncontrolled.module.scss'
import { CSSProperties } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt, faDownload } from '@fortawesome/free-solid-svg-icons'

const sections: IOptionSections[] = [
  {
    id: 1,
    items: [
      {
        id: 6,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
        type: OptionType.Button,
        title: 'Copy link',
        hint: '⌘ + L',
      },
    ],
    showLine: true,
  },
  {
    id: 2,
    items: [
      {
        id: 10,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
        type: OptionType.Button,
        title: 'Delete',
      },
    ],
    showLine: true,
  },
  {
    id: 3,
    items: [
      { id: 11, type: OptionType.Button, title: 'Import' },
      {
        id: 12,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faDownload} />,
        type: OptionType.Button,
        title: 'Download',
      },
    ],
    showLine: true,
  },
  {
    id: 4,
    items: [
      {
        id: 13,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
        type: OptionType.Button,
        title: 'Duplicate',
        subtitle: '⌘ + D',
      },
    ],
    showLine: true,
  },
]

const MediaControlUncontrolled = ({ style, onClick, onDismiss }: IProps) => {
  return (
    <OptionControls className={styles.container} sections={sections} style={style} onItemClick={onClick} onDismiss={onDismiss} />
  )
}

export default MediaControlUncontrolled

interface IProps {
  style: CSSProperties
  onClick: () => void
  onDismiss: () => void
}
