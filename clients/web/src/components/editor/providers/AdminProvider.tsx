import * as Storage from 'config/storage'
import { createContext, useState, useContext, useEffect, cloneElement } from 'react'

interface Context {
  organisationSlug: string | null
  projectSlug: string | null
  articlePath: string | null
}

interface ContextActions extends Context {
  setOrganisation: (organisationSlug: string, projectSlug: string, path: string | null) => void
  setProject: (projectSlug: string, path: string | null) => void
  setArticlePath: (path: string) => void
}

const AdminContext = createContext<ContextActions>({
  organisationSlug: null,
  projectSlug: null,
  articlePath: null,
  setOrganisation: () => {},
  setProject: () => {},
  setArticlePath: () => {},
})

export const useAdmin = () => useContext(AdminContext)

const KEY = 'admin'

export default function AdminProvider({ initialContext, children }: { initialContext: Context; children: any }) {
  const [context, setContext] = useState<Context>(initialContext)

  const setContextData = (data: Context) => {
    console.log(data)
    setContext(data)
    Storage.setLocalItem(KEY, data)
  }

  const setArticlePath = (path: string | null) => {
    setContextData({ ...context, articlePath: path })
  }

  const setProject = (projectSlug: string, articlePath: string | null) => {
    setContextData({ ...context, projectSlug, articlePath })
  }

  const setOrganisation = (organisationSlug: string, projectSlug: string, articlePath: string | null) => {
    setContextData({ ...context, organisationSlug, projectSlug, articlePath })
  }

  const localState = context // Storage.getLocalItem(KEY)

  return (
    <AdminContext.Provider value={{ ...localState, setArticlePath, setProject, setOrganisation }}>
      {children}
    </AdminContext.Provider>
  )
}
