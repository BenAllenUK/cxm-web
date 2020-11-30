import { IAction } from 'actions'
import actions, { types } from 'actions/modals'

export interface IModalState {
  modalVisibleKey: number | null
  payload: any
}

const initialState = {
  modalVisibleKey: null,
  payload: null,
}

export default function reducer(state: IModalState = initialState, action: IAction) {
  switch (action.type) {
    case types.TOGGLE_MODAL: {
      const { payload: data } = action as ReturnType<typeof actions.toggleModal>
      return {
        ...state,
        modalVisibleKey: data.item,
        payload: data.payload,
      }
    }
    case types.HIDE_MODAL: {
      return {
        ...state,
        modalVisibleKey: null,
        payload: null,
      }
    }
    default:
      return state
  }
}
