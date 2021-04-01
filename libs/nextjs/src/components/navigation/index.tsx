import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext } from 'react'
// import { Subdomain } from 'navigation/routes'
// import isLocalhost from 'utils/client/isLocalhost'
const PROTOCOL = process.env.PROTOCOL
const ROOT_HOST = process.env.ROOT_HOST
const API_HOST = process.env.API_HOST
const ADMIN_HOST = process.env.ADMIN_HOST

interface ContextActions {
  // navigateOrganisation: (organisation: string, module: Subdomain, path: string, variables?: object, options?: Options) => void
  // navigate: (module: Subdomain, path: string, variables?: object, options?: Options) => void
  push: (path: string, fullPath: string, options?: object) => void
}

const initialState = {
  // navigateOrganisation: () => {},
  // navigate: () => {},
  push: () => {}
}

const Context = createContext<ContextActions>(initialState)

export const useNavigation = () => useContext(Context)

type Options = { fullPath?: string } & {
  shallow?: boolean
  locale?: string | false
  scroll?: boolean
}

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

  // const navigateOrganisation = (organisation: string, module: Subdomain, path: string, variables: object = {}) => {
  //   const parsedPath = parse(path, variables)
  //   const hostname = getHost(module)

  //   if (isLocalhost()) {
  //     return
  //   }

  //   window.location.href = `${PROTOCOL}://${organisation}.${hostname}${parsedPath}`
  // }

  // const navigate = (module: Subdomain, path: string, variables: object = {}) => {
  //   const parsedPath = parse(path, variables)
  //   const hostname = getHost(module)

  //   if (module === getModule()) {
  //     var fullPath = parsedPath

  //     // Include first path if in localhost
  //     if (isLocalhost()) {
  //       fullPath = `/${window.location.pathname.split('/')[1]}${fullPath}`
  //     }

  //     router.push(parsedPath, fullPath)

  //     return
  //   }

  //   window.location.href = `${PROTOCOL}://${hostname}${parsedPath}`
  // }

  return <Context.Provider value={{ push }}>{children}</Context.Provider>
}

// export function getModule() {
//   var host = window.location.host

//   // Include first path if in localhost
//   if (isLocalhost()) {
//     host = `${host}/${window.location.pathname.split('/')[1]}`
//   }

//   if ((ROOT_HOST || '').indexOf(host) > -1) {
//     return Subdomain.Root
//   } else if ((ADMIN_HOST || '').indexOf(host) > -1) {
//     return Subdomain.Admin
//   } else if ((API_HOST || '').indexOf(host) > -1) {
//     return Subdomain.Api
//   }
// }

// export function getHost(module: Subdomain) {
//   switch (module) {
//     case Subdomain.Root:
//       return ROOT_HOST
//     case Subdomain.Admin:
//       return ADMIN_HOST
//     case Subdomain.Api:
//       return API_HOST
//   }
// }

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
