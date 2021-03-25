import { MouseEvent } from 'react'
function isInBottomHalf(e: MouseEvent) {
  return e.clientY / document.body.clientHeight < 0.5
}

export default isInBottomHalf
