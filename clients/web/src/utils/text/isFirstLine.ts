import { RefObject } from 'react'
import getCaretCoordinates from './getCaretCoordinates'
import isSingleLine from './isSingleLine'

const isFirstLine = (baseRef: RefObject<HTMLDivElement> | undefined, lineHeight: number) => {
  const singleLine = isSingleLine(baseRef, lineHeight)
  console.log(singleLine)
  if (singleLine) {
    return true
  }

  const coords = getCaretCoordinates(baseRef)

  if (!coords) {
    return false
  }

  const lineNumber = Math.floor(coords.y / lineHeight)

  return 0 === lineNumber
}

export default isFirstLine
