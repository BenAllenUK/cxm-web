export const types = {
  TEXT_CONTROL_MODAL_OPEN: '@/editor/TEXT_CONTROL_MODAL_OPEN',
  TEXT_CONTROL_MODAL_CLOSE: '@/editor/TEXT_CONTROL_MODAL_CLOSE',

  BLOCK_CONTROL_MODAL_OPEN: '@/editor/BLOCK_CONTROL_MODAL_OPEN',
  BLOCK_CONTROL_MODAL_CLOSE: '@/editor/BLOCK_CONTROL_MODAL_CLOSE',
}

function textControlOpen(position: { x: number; y: number }) {
  return {
    type: types.TEXT_CONTROL_MODAL_OPEN,
    payload: position,
  }
}

function textControlClose() {
  return {
    type: types.TEXT_CONTROL_MODAL_CLOSE,
    payload: {},
  }
}

function blockControlOpen(position: { x: number; y: number }) {
  return {
    type: types.BLOCK_CONTROL_MODAL_OPEN,
    payload: position,
  }
}

function blockControlClose() {
  return {
    type: types.BLOCK_CONTROL_MODAL_CLOSE,
    payload: {},
  }
}

export default {
  textControlOpen,
  textControlClose,

  blockControlOpen,
  blockControlClose,
}
