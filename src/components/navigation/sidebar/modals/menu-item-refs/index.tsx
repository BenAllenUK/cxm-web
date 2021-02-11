import { createContext, RefObject, useContext, useRef } from 'react'

type RefMap = { [key: number]: { [key: number]: HTMLDivElement } }

interface Context {
  locationRefs: RefObject<RefMap> | null
}

const Context = createContext<Context>({ locationRefs: null })

export const useMenuItemRefs = () => useContext(Context)

const Provider = ({ children }: any) => {
  const locationRefs = useRef<RefMap>({})

  return <Context.Provider value={{ locationRefs }}>{children}</Context.Provider>
}

export default { Provider }
