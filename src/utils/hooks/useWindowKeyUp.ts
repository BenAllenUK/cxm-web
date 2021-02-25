import { DependencyList, useEffect } from 'react'

function useWindowKeyUp(targetKey: string, handler: (e: KeyboardEvent) => void, dependents: DependencyList) {
  function upHandler(e: KeyboardEvent) {
    if (e.key === targetKey) {
      handler(e)
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keyup', upHandler)
    }
  }, dependents)
}

export default useWindowKeyUp
