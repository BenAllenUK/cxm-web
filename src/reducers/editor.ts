import { IAction } from 'actions'
import { types } from 'actions/editor'
import { Point } from 'types'

export interface IEditorState {
  textControlOpen: boolean
  textControlPosition: Point

  blockControlOpen: boolean
  blockControlPosition: Point
}

const initialState = {
  textControlOpen: false,
  textControlPosition: { x: 0, y: 0 },

  blockControlOpen: false,
  blockControlPosition: { x: 0, y: 0 },
}

export default function editor(state: IEditorState = initialState, action: IAction) {
  switch (action.type) {
    case types.TEXT_CONTROL_MODAL_OPEN: {
      const position = action.payload
      return {
        ...state,
        textControlOpen: true,
        textControlPosition: position,
      }
    }
    case types.TEXT_CONTROL_MODAL_CLOSE: {
      return {
        ...state,
        textControlOpen: false,
        textControlPosition: { x: 0, y: 0 },
      }
    }
    case types.BLOCK_CONTROL_MODAL_OPEN: {
      const position = action.payload
      return {
        ...state,
        blockControlOpen: true,
        blockControlPosition: position,
      }
    }
    case types.BLOCK_CONTROL_MODAL_CLOSE: {
      return {
        ...state,
        blockControlOpen: false,
        blockControlPosition: { x: 0, y: 0 },
      }
    }
    default:
      return state
  }
}
