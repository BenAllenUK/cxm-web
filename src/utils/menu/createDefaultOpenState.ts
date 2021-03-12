import { Article } from 'operations/articles/types'

function createDefaultOpenState(path: Article[]) {
  var state = {}
  path.forEach((item, i) => {
    state = { ...state, [item.id]: true }
  })
  return state
}

export default createDefaultOpenState
