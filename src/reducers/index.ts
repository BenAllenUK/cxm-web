import { combineReducers } from 'redux'
import editor, { initialState as editorInitialState } from './editor'
import modals, { initialState as modalInitialState } from './modals'
const reducer = combineReducers({ editor, modals })
export default reducer

export type IAppState = ReturnType<typeof reducer>

export const initialState = {
  editor: editorInitialState,
  modals: modalInitialState,
}
