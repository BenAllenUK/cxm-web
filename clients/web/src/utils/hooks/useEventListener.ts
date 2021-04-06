import { DependencyList, ForwardedRef, MutableRefObject, RefObject, useEffect } from 'react'

function useEventListener<T extends Element>(
  type: string,
  ref: RefObject<T> | ForwardedRef<T>,
  handler: (e: KeyboardEvent | MouseEvent) => void,
  dependents: DependencyList
) {
  function downHandler(e: Event) {
    const _e = e as KeyboardEvent | MouseEvent
    handler(_e)
  }

  useEffect(() => {
    const r = ref as MutableRefObject<T> | null
    if (r?.current) {
      r.current?.addEventListener(type, downHandler)
    }

    return () => {
      if (r?.current) {
        r.current?.removeEventListener(type, downHandler)
      }
    }
  }, dependents)
}

export default useEventListener
