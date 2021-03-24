import { RefObject } from 'react'
import getCaretCoordinates from './getCaretCoordinates'
import isSingleLine from './isSingleLine'

const isLastLine = (baseRef: RefObject<HTMLDivElement> | undefined, lineHeight: number) => {
  const singleLine = isSingleLine(baseRef, lineHeight)
  if (singleLine) {
    console.log('lastline called single line')
    return true
  }

  const coords = getCaretCoordinates(baseRef)

  if (!coords) {
    console.log('coords emptys')
    return false
  }

  const lineNumber = Math.floor(coords.y / lineHeight) + 1

  const rect = baseRef?.current?.getBoundingClientRect()

  if (!rect) {
    return false
  }

  const { height } = rect

  const maxLines = Math.floor(height / lineHeight)

  console.log(lineNumber, maxLines)
  return maxLines === lineNumber
}

export default isLastLine
