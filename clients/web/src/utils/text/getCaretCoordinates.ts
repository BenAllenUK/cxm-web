import { RefObject } from 'react'

const getCaretCoordinates = (baseRef: RefObject<HTMLDivElement> | undefined) => {
  let x = 0,
    y = 0
  const isSupported = typeof window.getSelection !== 'undefined'

  if (isSupported) {
    const selection = window.getSelection()
    if (selection && selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange()
      range.collapse(true)

      const rect = range.getClientRects()[0]
      // console.log(range.getClientRects())
      const parentRect = baseRef?.current?.getBoundingClientRect()
      if (rect) {
        x = parentRect ? rect.left - parentRect.left : rect.left
        y = parentRect ? rect.top - parentRect.top : rect.top
      } else {
        return null
      }
    }
  }

  // console.log(y)

  return { x, y }
}

export default getCaretCoordinates
