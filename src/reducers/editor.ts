import { IAction } from 'actions'
import { types } from 'actions/editor'
import { Point } from 'types'

export interface IEditorState {
  textStyleModalOpen: boolean
  textStyleModalSourcePosition: Point
}

const initialState = {
  textStyleModalOpen: false,
  textStyleModalSourcePosition: { x: 0, y: 0 },
}

export default function editor(state: IEditorState = initialState, action: IAction) {
  switch (action.type) {
    case types.TEXT_STYLE_MODAL_OPEN: {
      const position = action.payload
      return {
        ...state,
        textStyleModalOpen: true,
        textStyleModalSourcePosition: position,
      }
    }
    case types.TEXT_STYLE_MODAL_CLOSE: {
      return {
        ...state,
        textStyleModalOpen: false,
        textStyleModalSourcePosition: { x: 0, y: 0 },
      }
    }
    default:
      return state
  }
}
