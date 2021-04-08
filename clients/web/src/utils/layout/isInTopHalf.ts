import { MouseEvent } from 'react'

function isInTopHalf(e: MouseEvent) {
  console.log(e.clientY)
  console.log(document.body.clientHeight)
  return e.clientY / document.body.clientHeight < 0.5
}

export default isInTopHalf
