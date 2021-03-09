import createPositionModal from 'components/common/modals/position'
import { insertSpanWithClassName } from 'components/editor/utils/html'
import { createContext, ReactNode, RefObject, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react'
import { getSelectionMidPosition } from 'utils/modals/getSelectionMidPosition'
import { updateBoundedPosition } from 'utils/modals/updateBoundedPosition'
import { useLinkModal } from '../link'
import { useTextStyleModal } from '../text-style'
import TextControlUncontrolled from './TextControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useTextControlModal = useModal

const Component = (props: IProps) => {
  const { enabled, position, hideControls, rootRef } = useTextControlModal()
  const { showControls: showTextStyleModal } = useTextStyleModal()
  const { showControls: showLinkModal } = useLinkModal()

  const _onShowTextStyleModal = () => {
    if (!position) {
      return
    }
    showTextStyleModal(position || { x: 0, y: 0 })
  }

  const _onShowLinkModal = () => {
    if (!position) {
      return
    }

    insertSpanWithClassName('highlight')

    showLinkModal(position)
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
