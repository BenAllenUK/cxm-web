import { useEffect } from 'react'

function useWindowKeyUp(targetKey: string, handler: (e: KeyboardEvent) => void, dependents: any[] = []) {
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
