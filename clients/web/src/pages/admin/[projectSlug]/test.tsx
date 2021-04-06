import ControlledText from 'components/editor/blocks/text/ControlledText'
import Text from 'components/editor/blocks/text/Text'
import { useRef, useState } from 'react'
import useKeyDown from 'utils/hooks/useKeyDown'
import useKeyUp from 'utils/hooks/useKeyUp'
import isFirstLine from 'utils/text/isFirstLine'
import isLastLine from 'utils/text/isLastLine'

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

  // var isTopBoundary = false
  // var isBottomBoundary = false
  const [isTopBoundary, setTopBoundary] = useState<boolean>(false)
  const [isBottomBoundary, setBottomBoundary] = useState<boolean>(false)

  const _onFocus = (index: number) => {
    if (index === focusIndex) {
      return
    }
    setFocus(index)
    const reRef = { current: refs.current[index] }

    const firstLine = isFirstLine(reRef, initialHeight)
    const lastLine = isLastLine(reRef, initialHeight)

    setTopBoundary(firstLine)
    setBottomBoundary(lastLine)
  }

  const _onBlur = (index: number) => {
    if (index === focusIndex) {
      setFocus(-1)
    }
  }

  const currentRef = { current: refs.current[focusIndex] }

  const recheck = () => {
    if (focusIndex === -1) {
      return
    }

    console.log(focusIndex, currentRef)

    const firstLine = isFirstLine(currentRef, initialHeight)
    const lastLine = isLastLine(currentRef, initialHeight)

    setTopBoundary(firstLine)
    setBottomBoundary(lastLine)
  }

  useKeyDown(
    'ArrowUp',
    currentRef,
    (e) => {
      if (isTopBoundary) {
        onFocusOutStart()
        e.preventDefault()
        e.stopPropagation()
        return
      }
    },
    [isTopBoundary, onFocusOutStart]
  )

  useKeyUp(
    'ArrowUp',
    currentRef,
    (e) => {
      recheck()
    },
    [isTopBoundary, recheck]
  )

  useKeyDown(
    'ArrowDown',
    currentRef,
    (e) => {
      if (isBottomBoundary) {
        onFocusOutEnd()
        e.preventDefault()
        e.stopPropagation()
      }
    },
    [isBottomBoundary, onFocusOutEnd]
  )

  useKeyUp(
    'ArrowDown',
    currentRef,
    (e) => {
      recheck()
    },
    [isBottomBoundary, recheck]
  )

  console.log(focusIndex, isTopBoundary, isBottomBoundary)
  return (
    <>
      <h1>This is a test</h1>
      <div style={{ padding: 30, backgroundColor: 'grey' }}>
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
          valueStart="abce123"
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
          valueStart="line1<br />line2"
        />
        <Item
          innerRef={(ref: any) => {
            refs.current[3] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={3}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 3}
          valueStart="line1<br />line2<br />line3"
        />
        <Item
          innerRef={(ref: any) => {
            refs.current[4] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={4}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 4}
          valueStart="abce123"
        />
        <Item
          innerRef={(ref: any) => {
            refs.current[5] = ref
          }}
          onFocusOutStart={onFocusOutStart}
          onFocusOutEnd={onFocusOutEnd}
          index={5}
          onFocus={_onFocus}
          onBlur={_onBlur}
          focus={focusIndex === 5}
          valueStart="end"
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
