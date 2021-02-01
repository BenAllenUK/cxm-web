import OptionControls, { OptionType, IOptionElements } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'

const items: IOptionElements[] = [
  {
    id: 1,
    icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
    type: OptionType.Button,
    title: 'Delete',
  },
  {
    id: 2,
    icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faClone} />,
    type: OptionType.Button,
    title: 'Duplicate',
    hint: '⌘ + D',
  },
  {
    id: 3,
    icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
    type: OptionType.Button,
    title: 'Copy Link',
  },
  {
    id: 4,
    icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faEdit} />,
    type: OptionType.Button,
    title: 'Rename',
    hint: '⌘ + Shift + R',
  },
  { type: OptionType.Line },
  {
    id: 5,
    icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
    type: OptionType.Button,
    title: 'Move to',
    hint: '⌘ + Shift + P',
  },
]

const PageControls = ({ position, onClick, onDismiss }: IProps) => {
  return <OptionControls items={items} position={position} filterText={null} onClick={onClick} onDismiss={onDismiss} />
}

export default PageControls

interface IProps {
  position: { x: number; y: number }
  onClick: () => void
  onDismiss: () => void
}
