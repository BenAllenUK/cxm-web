import { DependencyList, useEffect } from 'react'

function useWindowKeyDown(targetKey: string, handler: (e: KeyboardEvent) => void, dependents: DependencyList) {
  function downHandler(e: KeyboardEvent) {
    if (e.key === targetKey) {
      handler(e)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
    }
  }, dependents)
}

export default useWindowKeyDown
