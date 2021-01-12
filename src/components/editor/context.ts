import { createContext } from 'react'

interface EditorContext {
  projectIndex: number | null
  articleId: number | null
  setProjectIndex: (i: number) => void
  setArticleId: (id: number) => void
}

export const EditorContext = createContext<EditorContext>({
  projectIndex: 0,
  articleId: 1,
  setProjectIndex: (_) => {},
  setArticleId: (_) => {},
})
