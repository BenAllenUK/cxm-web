/// <reference types="next" />
/// <reference types="next/types/global" />

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
