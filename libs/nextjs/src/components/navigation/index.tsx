import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext } from 'react'
interface ContextActions {
  push: (path: string, fullPath: string, options?: object) => void
}

const initialState = {
  push: () => {}
}

const Context = createContext<ContextActions>(initialState)

export const useNavigation = () => useContext(Context)

// TODO: Figure out a better way to deal with this

const Provider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const push = (path: string, fullPath: string, variables: object = {}) => {
    const parsedPath = parse(fullPath, variables)

    var fullPath = parsedPath

    // Include first path if in localhost
    if (
      process.env.NODE_ENV !== 'production' &&
      window.location.hostname === 'localhost'
    ) {
      fullPath = `/${window.location.pathname.split('/')[1]}${fullPath}`
    }

    router.push(path, fullPath, { shallow: true })
  }

  return <Context.Provider value={{ push }}>{children}</Context.Provider>
}

export function parse(str: string, vars: object) {
  if (typeof str === 'string' && vars instanceof Object) {
    if (Object.keys(vars).length === 0) {
      return str
    }
    for (const _ in vars) {
      return str.replace(/({([^}]+)})/g, function (i) {
        console.log(i)
        const key = i.replace(/{/, '').replace(/}/, '')
        // @ts-ignore

        if (vars[key] === undefined || vars[key] == null) {
          return i
        }
        // @ts-ignore
        return vars[key]
      })
    }
  } else {
    return str
  }
  return str
}

export default Provider
