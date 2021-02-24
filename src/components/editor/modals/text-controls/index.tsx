import createPositionModal from 'components/common/modals/position'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import { useLinkModal } from '../link'
import { useTextStyleModal } from '../text-style'
import TextControlUncontrolled from './TextControlUncontrolled'

const { Provider, useModal } = createPositionModal()

export const useTextControlModal = useModal

const Component = (props: IProps) => {
  const { enabled, position, hideControls } = useTextControlModal()
  const { showControls: showTextStyleModal } = useTextStyleModal()
  const { showControls: showLinkModal } = useLinkModal()

  const _onShowTextStyleModal = () => {
    if (!position) {
      return
    }

    // const s = window.getSelection()
    // const oRange = s.getRangeAt(0) //get the text range
    // console.log(oRange)
    // console.log(oRange.getClientRects())
    // const oRect = oRange.getBoundingClientRect()

    // console.log(oRect)

    showTextStyleModal(position)
  }

  const _onShowLinkModal = () => {
    if (!position) {
      return
    }

    showLinkModal(position)
  }

  const _onShowConversionModal = () => {}

  const _onShowCommentModal = () => {}

  const _onShowMoreModal = () => {}

  return (
    <>
      {enabled && position && (
        <TextControlUncontrolled
          onDismiss={hideControls}
          style={{
            left: position.x,
            top: position.y,
          }}
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
