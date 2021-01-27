import {
  EventHandler,
  RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

// https://usehooks.com/

export function useToggle<T>(initialValue = false) {
  // Returns the tuple [state, dispatch]
  // Normally with useReducer you pass a value to dispatch to indicate what action to
  // take on the state, but in this case there's only one action.
  return useReducer((state) => !state, initialValue)
}

export function useAsync(asyncFunction: () => Promise<any>, immediate = true) {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return asyncFunction()
      .then((response: any) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}

export function useEventListener(eventName: string, handler: MouseEvent, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef<any>()

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener
      if (!isSupported) return

      // Create event listener that calls handler function stored in ref
      const eventListener = (event: any) => savedHandler.current(event)

      // Add event listener
      element.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener)
      }
    },
    [eventName, element] // Re-run if eventName or element changes
  )
}

export function useOnClickOutside<T extends Element>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  useEffect(
    () => {
      const listener = (event: any) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export function useHover<T extends Element>(): [RefObject<T>, boolean] {
  const [value, setValue] = useState(false)

  const ref = useRef<T>(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    [ref.current] // Recall only if ref changes
  )

  return [ref, value]
}

export function useLocalStorage(key: string, initialValue: object | string) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.log(error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: string | object) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

export function useKeyDown<T extends Element>(
  targetKey: string,
  ref: RefObject<T>,
  handler: (e: KeyboardEvent) => void
) {
  function downHandler(e: Event) {
    const _e = e as KeyboardEvent
    if (_e.key === targetKey) {
      handler(_e)
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current?.addEventListener('keydown', downHandler)
    }

    return () => {
      if (ref.current) {
        ref.current?.removeEventListener('keydown', downHandler)
      }
    }
  }, [])
}

export function useKeyUp<T extends Element>(
  targetKey: string,
  ref: RefObject<T>,
  handler: (e: KeyboardEvent) => void
) {
  function upHandler(e: Event) {
    const _e = e as KeyboardEvent
    if (_e.key === targetKey) {
      handler(_e)
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current?.addEventListener('keyup', upHandler)
    }
    return () => {
      if (ref.current) {
        ref.current?.removeEventListener('keyup', upHandler)
      }
    }
  }, [])
}
