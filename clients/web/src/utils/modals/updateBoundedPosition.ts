import { RefObject } from 'react'

const VERTICAL_PADDING = 20

export function updateBoundedPosition(
  rootRef: RefObject<HTMLDivElement> | undefined,
  ref: RefObject<HTMLDivElement>,
  preferredPosition: { x: number; y: number } | null,
  relativePosition: 'below' | 'above' = 'above'
) {
  const width = ref.current?.getBoundingClientRect().width || 0
  const height = ref.current?.getBoundingClientRect().height || 0
  if (!preferredPosition) {
    return
  }

  let positionX = preferredPosition.x - width / 2
  if (positionX < 0) {
    positionX = 10
  }

  const rootWidth = rootRef?.current?.getBoundingClientRect().width || 0
  if (positionX > rootWidth - width) {
    positionX = rootWidth - width - 10
  }

  let positionY = preferredPosition.y

  if (relativePosition === 'above') {
    positionY -= 1 * height + VERTICAL_PADDING
  } else {
    positionY += VERTICAL_PADDING
  }

  if (ref.current) {
    ref.current.style.left = `${positionX}px`
    ref.current.style.top = `${positionY}px`
  }
}
