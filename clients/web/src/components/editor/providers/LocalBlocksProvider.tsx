import debounce from 'lodash/debounce'
import { createContext, useState, useContext, useCallback } from 'react'
import useWindowKeyDown from 'utils/hooks/useWindowKeyDown'
import { Block } from '../blocks/types'

interface Context {
  blocks: Block[]
}

interface State {
  past: Block[][]
  present: Block[]
  future: Block[][]
}

type BlockUpdateHandler = (prevBlocks: Block[]) => Block[]

interface ContextActions extends Context {
  setBlocks: (handler: BlockUpdateHandler) => void
  undo: () => void
  redo: () => void
}

const LocalBlocksContext = createContext<ContextActions>({
  blocks: [],
  setBlocks: () => {},
  undo: () => {},
  redo: () => {},
})

export const useLocalBlocksProvider = () => useContext(LocalBlocksContext)

export default function LocalBlocksProvider({ initialBlocks, children }: { initialBlocks: Block[]; children: any }) {
  // const [blocks, setBlocks] = useState<Block[]>(initialBlocks)

  const initialHistory = {
    past: [],
    present: initialBlocks,
    future: [],
  }
  const [history, setHistory] = useState<State>(initialHistory)
  const blocks = history.present

  const setBlocksPast = useCallback((present: Block[]) => {
    setHistory((prevHistory) => {
      return {
        ...prevHistory,
        past: [...prevHistory.past, present],
      }
    })
  }, [])

  const setBlocksPastDebounced = useCallback(debounce(setBlocksPast, 500), [setBlocksPast])

  const setBlocks = (handler: BlockUpdateHandler) => {
    setHistory((prevHistory) => {
      const newPresent = handler(prevHistory.present)

      // Debounce history update
      setBlocksPastDebounced(prevHistory.present)

      // If no. of items has changed then flush
      // if (prevHistory.present.length !== newPresent.length) {
      // setBlocksPastDebounced.cancel()
      // setBlocksPast(prevHistory.present)
      // }

      return {
        ...prevHistory,
        present: newPresent,
        future: [],
      }
    })
  }

  const undo = () => {
    setHistory((prevHistory) => {
      const previous = prevHistory.past[prevHistory.past.length - 1]
      const newPast = prevHistory.past.slice(0, prevHistory.past.length - 1)
      if (!previous) {
        return prevHistory
      }

      return {
        past: newPast,
        present: previous,
        future: [prevHistory.present, ...prevHistory.future],
      }
    })
  }

  const redo = () => {
    setHistory((prevHistory) => {
      const next = prevHistory.future[0]
      const newFuture = prevHistory.future.slice(1)

      if (!next) {
        return prevHistory
      }

      return {
        past: [...prevHistory.past, prevHistory.present],
        present: next,
        future: newFuture,
      }
    })
  }

  useWindowKeyDown(
    'z',
    (e) => {
      if (!e.metaKey) return

      if (!e.shiftKey) {
        undo()
      } else {
        redo()
      }
    },
    [undo, redo]
  )

  return <LocalBlocksContext.Provider value={{ undo, redo, setBlocks, blocks }}>{children}</LocalBlocksContext.Provider>
}
