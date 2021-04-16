import { BlockData, BlockType, MediaSourceObject, MediaSourceType } from 'components/editor/blocks/types'
import FileSelectionUncontrolled, { IFileSelectionUncontrolledProps } from './FileSelectionUncontrolled'
import createAnchorModal from 'components/common/modals/anchor'

const { Provider, useModal } = createAnchorModal()

export const useFileSelectionModal = useModal

const Component = (props: IProps) => {
  const { enabled, payload } = useFileSelectionModal()

  const { sources } = payload as { sources: MediaSourceObject[] }

  return <>{enabled && <FileSelectionUncontrolled {...props} sources={sources} />}</>
}

const FileSelectionModal = { Provider, Component }

export default FileSelectionModal

interface IProps extends IFileSelectionUncontrolledProps {}
