import { combineReducers } from 'redux'
import editor from './editor'
import modals from './modals'
const reducer = combineReducers({ editor, modals })
export default reducer

export type IAppState = ReturnType<typeof reducer>
