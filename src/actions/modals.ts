import { ModalTypes } from 'types/modals'

export const types = {
  TOGGLE_MODAL: '@/modals/TOGGLE_MODAL',
  HIDE_MODAL: '@/modals/HIDE_MODAL',
}

function toggleModal(item: ModalTypes, payload?: any) {
  return {
    type: types.TOGGLE_MODAL,
    payload: {
      item,
      payload,
    },
  }
}

function hideModal() {
  return {
    type: types.HIDE_MODAL,
    payload: {},
  }
}

export default {
  toggleModal,
  hideModal,
}
