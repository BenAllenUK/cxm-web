import { RefObject, useEffect, useRef, useState } from 'react'

function useHover<T extends Element>(): [RefObject<T>, boolean] {
  const [value, setValue] = useState(false)

  const ref = useRef<T>(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseenter', handleMouseOver)
        node.addEventListener('mouseleave', handleMouseOut)

        return () => {
          node.removeEventListener('mouseenter', handleMouseOver)
          node.removeEventListener('mouseleave', handleMouseOut)
        }
      }
    },
    [ref.current] // Recall only if ref changes
  )

  return [ref, value]
}

export default useHover
