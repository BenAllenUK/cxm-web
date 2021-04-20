import createPositionModal from 'components/common/modals/position'
import { getSelectionMidPosition } from 'utils/modals/getSelectionMidPosition'
import { useLinkModal } from '../link'
import { useTextStyleModal } from '../text-style'
import TextControlUncontrolled from './TextControlUncontrolled'
import { insertLinkPlaceholder } from 'utils/html/links'

const { Provider, useModal } = createPositionModal()

export const useTextControlModal = useModal

const Component = (props: IProps) => {
  const { enabled, position, hideControls, rootRef } = useTextControlModal()
  const { showControls: showTextStyleModal } = useTextStyleModal()
  const { showControls: showLinkModal } = useLinkModal()

  const _onShowTextStyleModal = () => {
    const selectionPosition = getSelectionMidPosition()
    if (!selectionPosition) {
      return
    }

    showTextStyleModal(selectionPosition)
  }

  const _onShowLinkModal = () => {
    const selectionPosition = getSelectionMidPosition()
    if (!selectionPosition) {
      return
    }

    const tag = insertLinkPlaceholder()
    showLinkModal(selectionPosition)
  }

  const _onShowConversionModal = () => {}

  const _onShowCommentModal = () => {}

  const _onShowMoreModal = () => {}

  return (
    <>
      {enabled && position && (
        <TextControlUncontrolled
          position={position}
          rootRef={rootRef}
          onDismiss={hideControls}
          onShowTextStyleModal={_onShowTextStyleModal}
          onShowLinkModal={_onShowLinkModal}
          onShowConversionModal={_onShowConversionModal}
          onShowCommentModal={_onShowCommentModal}
          onShowMoreModal={_onShowMoreModal}
          {...props}
        />
      )}
    </>
  )
}

const TextControl = { Provider, Component }

export default TextControl

interface IProps {}
