/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'

  const value: any
  export = value
}

declare module 'cloudinary-react'
declare module 'react-jw-player'

type ReduxProps<T extends (...args: any) => any, U extends (...args: any) => any> = (T extends (...args: any) => infer R
  ? R
  : any) &
  (U extends (...args: any) => infer R ? R : any)

type Type<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

declare module 'react-jw-player'
