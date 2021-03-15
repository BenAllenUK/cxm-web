export function getSelectionMidPosition() {
  const s = window.getSelection()
  if (s && s.toString().length > 0) {
    const oRange = s.getRangeAt(0)
    const oRect = oRange.getBoundingClientRect()
    const xPos = oRect.x + oRect.width / 2
    return {
      x: xPos,
      y: oRect.y,
    }
  }
  return null
}
