import { combineReducers } from 'redux'
import editor, { initialState as editorInitialState } from './editor'
import modals, { initialState as modalInitialState } from './modals'
import app, { initialState as appInitialState } from './app'
const reducer = combineReducers({ editor, modals, app })
export default reducer

export type IRootState = ReturnType<typeof reducer>

export const initialState = {
  editor: editorInitialState,
  modals: modalInitialState,
  app: appInitialState,
}
