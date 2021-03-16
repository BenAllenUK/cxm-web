import { DependencyList, ForwardedRef, MutableRefObject, RefObject, useEffect } from 'react'

function useKeyDown<T extends Element>(
  targetKey: string,
  ref: RefObject<T> | ForwardedRef<T>,
  handler: (e: KeyboardEvent) => void,
  dependents: DependencyList
) {
  function downHandler(e: Event) {
    const _e = e as KeyboardEvent
    if (_e.key === targetKey) {
      handler(_e)
    }
  }

  useEffect(() => {
    const r = ref as MutableRefObject<T> | null
    if (r?.current) {
      r.current?.addEventListener('keydown', downHandler)
    }

    return () => {
      if (r?.current) {
        r.current?.removeEventListener('keydown', downHandler)
      }
    }
  }, dependents)
}

export default useKeyDown
