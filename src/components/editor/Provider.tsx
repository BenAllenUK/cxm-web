import * as Storage from 'config/storage'
import { createContext, useState, useContext, useEffect, cloneElement } from 'react'

interface Context {
  projectId: number | null
  articleId: number | null
}

interface ContextActions extends Context {
  setProjectIndex: (projectId: number) => void
  setArticleId: (articleId: number) => void
}

const EditorContext = createContext<ContextActions>({
  projectId: null,
  articleId: null,
  setProjectIndex: () => {},
  setArticleId: () => {},
})

export const useEditor = () => useContext(EditorContext)

const KEY = 'editor'
const initialState = { projectId: 0, articleId: 1 }

export default function EditorProvider(props: any) {
  const [context, setContext] = useState<Context>(initialState)

  const setContextData = (data: Context) => {
    setContext(data)
    Storage.setLocalItem(KEY, data)
  }

  const setArticleId = (articleId: number) => {
    setContextData({ ...context, articleId })
  }

  const setProjectId = (projectId: number) => {
    setContextData({ ...context, projectId })
  }

  const localState = Storage.getLocalItem(KEY) || initialState

  return (
    <EditorContext.Provider value={{ ...localState, setArticleId, setProjectId }}>
      {props.children}
    </EditorContext.Provider>
  )
}
