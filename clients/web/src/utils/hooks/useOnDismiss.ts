import { RefObject, useEffect } from 'react'
import useWindowKeyDown from './useWindowKeyDown'
import useOnClickOutside from './useOnClickOnOutside'

function useOnDismiss<T extends Element>(ref: RefObject<T>, handler: (event: MouseEvent | KeyboardEvent) => void) {
  useWindowKeyDown(
    'Escape',
    (e) => {
      handler(e)
    },
    [handler]
  )

  useOnClickOutside(ref, handler)
}

export default useOnDismiss
