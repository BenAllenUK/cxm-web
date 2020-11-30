import { Point } from 'types'

export const types = {
  TEXT_STYLE_MODAL_OPEN: '@/editor/TEXT_STYLE_MODAL_OPEN',
  TEXT_STYLE_MODAL_CLOSE: '@/editor/TEXT_STYLE_MODAL_CLOSE',
}

function textStyleModalOpen(position: Point) {
  return {
    type: types.TEXT_STYLE_MODAL_OPEN,
    payload: position,
  }
}

function textStyleModalClose() {
  return {
    type: types.TEXT_STYLE_MODAL_CLOSE,
    payload: {},
  }
}

export default {
  textStyleModalOpen,
  textStyleModalClose,
}
