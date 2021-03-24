import { RefObject } from 'react'

const isSingleLine = (baseRef: RefObject<HTMLDivElement> | undefined, lineHeight: number) => {
  const parentRect = baseRef?.current?.getBoundingClientRect()

  if (!parentRect) return false

  return Math.floor(parentRect?.height / lineHeight) <= 1
}

export default isSingleLine
