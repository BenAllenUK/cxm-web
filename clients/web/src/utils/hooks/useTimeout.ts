import { EffectCallback, useEffect, useRef } from 'react'

function useTimeout(callback: EffectCallback, delay: number) {
  const savedCallback = useRef<EffectCallback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      const id = setTimeout(tick, delay)
      return () => clearTimeout(id)
    }
  }, [delay])
}

export default useTimeout
