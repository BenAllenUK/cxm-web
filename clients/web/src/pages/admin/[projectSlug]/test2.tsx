import ControlledText from 'components/editor/blocks/text/ControlledText'
import { useRef, useState } from 'react'
import useEventListener from 'utils/hooks/useEventListener'

const Test = () => {
  const [focusIndex, setFocus] = useState<number>(0)
  const refs = useRef<HTMLDivElement[]>([])

  const initialHeight = 20

  const onFocusOutStart = () => {
    setFocus((val) => val - 1)
  }

  const onFocusOutEnd = () => {
    setFocus((val) => val + 1)
  }

  const _onFocus = (index: number) => {
    if (index === focusIndex) {
      return
    }
    setFocus(index)
  }

  const _onBlur = (index: number) => {
    if (index === focusIndex) {
      setFocus(-1)
    }
  }

  const currentRef = { current: refs.current[focusIndex] }

  const containerRef = useRef<HTMLDivElement>(null)

  useEventListener(
    'keyup',
    containerRef,
    (e) => {
      const absolutePos = getPos()
      // const xPos = getCaretTopPoint()
      // console.log(xPos, absolutePos)
      if (!absolutePos) {
        return
      }
      const relativePos = {
        x: absolutePos.x - currentRef.current.getBoundingClientRect().left,
        y: absolutePos.y - currentRef.current.getBoundingClientRect().top - 1,
      }

      const lineNumber = relativePos.y / 20
      const maxLines = currentRef.current.getBoundingClientRect().height / 20

      // console.log(lineNumber, maxLines)
    },
    [currentRef]
  )

  useEventListener(
    'keydown',
    containerRef,
    (e) => {
      const absolutePos = getPos()
      if (!absolutePos) {
        // console.error(`No position`)
        return
      }
      const relativePos = {
        x: absolutePos.x - currentRef.current.getBoundingClientRect().left,
        y: absolutePos.y - currentRef.current.getBoundingClientRect().top - 1,
      }

      const lineNumber = relativePos.y / 20
      const maxLines = currentRef.current.getBoundingClientRect().height / 20
      console.log(lineNumber, maxLines)

      const _e = e as KeyboardEvent

      if (_e.key === 'ArrowUp' && lineNumber === 0) {
        // move up
        console.log('move up')
        onFocusOutStart()
        e.preventDefault()
        e.stopPropagation()
      }

      if (_e.key === 'ArrowDown' && lineNumber + 1 === maxLines) {
        // move down
        console.log('move down')
        onFocusOutEnd()
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [currentRef, onFocusOutStart, onFocusOutEnd]
  )

  return (
    <>
      <h1>This is a test</h1>
      <div ref={containerRef} style={{ padding: 30, backgroundColor: 'grey' }}>
        <Item
          innerRef={(ref: any) => {
            refs.current[0] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={0}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 0}
          valueStart="start"
        />
        <Item
          innerRef={(ref: any) => {
            refs.current[1] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={1}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 1}
          valueStart="second item line1<br />second item line2<br />second item line3"
        />
        <Item
          innerRef={(ref: any) => {
            refs.current[2] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={2}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 2}
          valueStart="third item"
        />
      </div>
    </>
  )
}

const Item = ({ innerRef, index, onFocusOutStart, onFocusOutEnd, valueStart, focus, onFocus, onBlur }: any) => {
  const [value, setValue] = useState<string>(valueStart)

  const initialHeight = 20
  const ref = useRef<HTMLDivElement>(null)

  const _onFocus = () => {
    onFocus(index)
  }

  const _onBlur = () => {
    onBlur(index)
  }

  return (
    <ControlledText
      ref={innerRef}
      onFocus={_onFocus}
      onBlur={_onBlur}
      focus={focus}
      initialValue={value}
      onTextChange={(value) => setValue(value)}
    />
  )
}

export default Test

function getPos() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange()
    range.collapse(true)

    // This returns null when it traverses into a northern container
    const rect = range.getClientRects()[0]

    if (!rect) {
      console.error(`No rect`)
      console.log(selection)
      console.log(range)
      console.log(range.getClientRects())
      return null
    }

    return { x: rect.left, y: rect.top }
  }
  console.error(`No selection`)
  return null
}

function getCaretTopPoint() {
  const sel = document.getSelection()
  if (!sel) return
  const r = sel.getRangeAt(0)
  let rect
  let r2
  // supposed to be textNode in most cases
  // but div[contenteditable] when empty
  const node = r.startContainer as Element
  const offset = r.startOffset
  if (offset > 0) {
    // new range, don't influence DOM state
    r2 = document.createRange()
    r2.setStart(node, offset - 1)
    r2.setEnd(node, offset)
    // https://developer.mozilla.org/en-US/docs/Web/API/range.getBoundingClientRect
    // IE9, Safari?(but look good in Safari 8)
    rect = r2.getBoundingClientRect()
    return { left: rect.right, top: rect.top }
    // @ts-ignore
  } else if (offset < node.length) {
    r2 = document.createRange()
    // similar but select next on letter
    r2.setStart(node, offset)
    r2.setEnd(node, offset + 1)
    rect = r2.getBoundingClientRect()
    return { left: rect.left, top: rect.top }
  } else {
    // textNode has length
    // https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
    console.log(node)
    rect = node.getBoundingClientRect()
    const styles = getComputedStyle(node)
    const lineHeight = parseInt(styles.lineHeight)
    const fontSize = parseInt(styles.fontSize)
    // roughly half the whitespace... but not exactly
    const delta = (lineHeight - fontSize) / 2
    return { left: rect.left, top: rect.top + delta }
  }
}
