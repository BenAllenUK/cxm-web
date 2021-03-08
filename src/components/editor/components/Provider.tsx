import * as Storage from 'config/storage'
import { createContext, useState, useContext, useEffect, cloneElement } from 'react'

interface Context {
  projectSlug: string | null
  articlePath: string | null
}

interface ContextActions extends Context {
  setProjectSlug: (slug: string) => void
  setArticlePath: (path: string) => void
}

const EditorContext = createContext<ContextActions>({
  projectSlug: null,
  articlePath: null,
  setProjectSlug: () => {},
  setArticlePath: () => {},
})

export const useEditor = () => useContext(EditorContext)

const KEY = 'editor'

export default function EditorProvider({ initialContext, children }: { initialContext: Context; children: any }) {
  const [context, setContext] = useState<Context>(initialContext)

  const setContextData = (data: Context) => {
    console.log(data)
    setContext(data)
    Storage.setLocalItem(KEY, data)
  }

  const setArticlePath = (path: string | null) => {
    setContextData({ ...context, articlePath: path })
  }

  const setProjectSlug = (slug: string) => {
    setContextData({ ...context, projectSlug: slug })
  }

  const localState = context // Storage.getLocalItem(KEY)

  return <EditorContext.Provider value={{ ...localState, setArticlePath, setProjectSlug }}>{children}</EditorContext.Provider>
}
