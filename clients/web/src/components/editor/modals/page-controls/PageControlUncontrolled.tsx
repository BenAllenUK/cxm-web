import OptionControls, { OptionType, IOptionSections } from 'components/common/option-controls'
import styles from './PageControlUncontrolled.module.scss'
import Footer from './Footer'
import { CSSProperties } from 'react'
import { useConfigControlModal } from 'components/editor/modals/config-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faStar, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLock, faLevelUpAlt, faDownload, faUndo, faCog } from '@fortawesome/free-solid-svg-icons'

const PageControlUncontrolled = ({ style, onClick, onDismiss }: IProps) => {
  const { showControls } = useConfigControlModal()

  const showConfigControls = () => {
    console.log('in showConfigControls function', showControls)
    showControls({ x: 500, y: 500 })
  }
  const sections: IOptionSections[] = [
    {
      id: 1,
      items: [
        { id: 1, type: OptionType.Switch, title: 'Small text', state: false },
        { id: 2, type: OptionType.Switch, title: 'Full width', state: false },
      ],
      showLine: true,
    },
    {
      id: 2,
      items: [
        {
          id: 4,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLock} />,
          type: OptionType.Button,
          title: 'Lock page',
        },
      ],
      showLine: true,
    },
    {
      id: 3,
      items: [
        {
          id: 5,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faStar} />,
          type: OptionType.Button,
          title: 'Add to favorites',
        },
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
      id: 4,
      items: [
        {
          id: 7,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faUndo} />,
          type: OptionType.Button,
          title: 'Undo',
          hint: '⌘ + Z',
        },
        // { id: 8, type: OptionType.Button, title: 'Page history' },
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
      id: 5,
      items: [
        { id: 11, type: OptionType.Button, title: 'Import' },
        {
          id: 12,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faDownload} />,
          type: OptionType.Button,
          title: 'Export',
          subtitle: 'PDF, HTML, Markdown',
        },
      ],
      showLine: true,
    },
    {
      id: 6,
      items: [
        {
          id: 13,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
          type: OptionType.Button,
          title: 'Move to',
          subtitle: '⌘ + Shift + P',
        },
      ],
      showLine: true,
    },
    {
      id: 7,
      items: [
        {
          id: 14,
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faCog} />,
          type: OptionType.Button,
          title: 'Settings',
          onClick: showConfigControls,
        },
      ],
      showLine: true,
    },
  ]
  return (
    <OptionControls
      className={styles.container}
      sections={sections}
      style={style}
      onItemClick={onClick}
      onDismiss={onDismiss}
      footer={<Footer wordCount={300} lastEditedName={'Ben Allen'} lastEditedAt={new Date().toISOString()} />}
    />
  )
}

export default PageControlUncontrolled

interface IProps {
  style: CSSProperties
  onClick: () => void
  onDismiss: () => void
}
