import modals from './modals'
import editor from './editor'

const Actions = {
  modals,
  editor,
}
export default Actions

export interface IAction {
  type: string
  payload: any
}
