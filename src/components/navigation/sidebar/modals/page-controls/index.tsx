import OptionControls, { OptionType, IOptionElements, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import createPositionModal from 'components/common/modals/position'

export enum PageControlOptions {
  Delete = 0,
  Duplicate,
  Copy,
  Rename,
}

const sections: IOptionSections[] = [
  {
    id: 0,
    showLine: true,
    items: [
      {
        id: PageControlOptions.Delete,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faTrashAlt} />,
        type: OptionType.Button,
        title: 'Delete',
      },
      {
        id: PageControlOptions.Duplicate,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faClone} />,
        type: OptionType.Button,
        title: 'Duplicate',
        hint: '⌘ + D',
      },
      {
        id: PageControlOptions.Copy,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLink} />,
        type: OptionType.Button,
        title: 'Copy Link',
      },
      {
        id: PageControlOptions.Rename,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faEdit} />,
        type: OptionType.Button,
        title: 'Rename',
        hint: '⌘ + Shift + R',
      },
    ],
  },
  {
    id: 1,
    showLine: true,
    items: [
      {
        id: 5,
        icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1 }} icon={faLevelUpAlt} />,
        type: OptionType.Button,
        title: 'Move to',
        hint: '⌘ + Shift + P',
      },
    ],
  },
]

const { Provider, useModal } = createPositionModal()

export const usePageControlModals = useModal

const Component = ({ onClick }: IComponentProps) => {
  const { enabled, position, hideControls } = usePageControlModals()
  const _onClick = (sectionId: number, id: number) => {
    onClick(sectionId, id)
    hideControls()
  }

  return (
    <>
      {enabled && position && (
        <OptionControls
          sections={sections}
          style={{ left: position.x, top: position.y }}
          onItemClick={_onClick}
          onDismiss={hideControls}
        />
      )}
    </>
  )
}

export default {
  Component,
  Provider,
}

interface IComponentProps {
  onClick: (sectionId: number, itemId: PageControlOptions) => void
}
