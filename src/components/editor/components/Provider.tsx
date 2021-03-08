import * as Storage from 'config/storage'
import { createContext, useState, useContext, useEffect, cloneElement } from 'react'

interface Context {
  projectSlug: string | null
  articleSlug: string | null
}

interface ContextActions extends Context {
  setProjectSlug: (slug: string) => void
  setArticleSlug: (slug: string) => void
}

const EditorContext = createContext<ContextActions>({
  projectSlug: null,
  articleSlug: null,
  setProjectSlug: () => {},
  setArticleSlug: () => {},
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

  const setArticleSlug = (slug: string) => {
    setContextData({ ...context, articleSlug: slug })
  }

  const setProjectSlug = (slug: string) => {
    setContextData({ ...context, projectSlug: slug })
  }

  const localState = context // Storage.getLocalItem(KEY)

  return <EditorContext.Provider value={{ ...localState, setArticleSlug, setProjectSlug }}>{children}</EditorContext.Provider>
}
