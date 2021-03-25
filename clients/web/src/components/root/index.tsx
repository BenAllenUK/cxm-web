import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'config/graphql'
import { ReactNode } from 'react'

export default function Root({ initialApolloState, initialUserData, children }: IProps) {
  const apolloClient = useApollo(initialApolloState, initialUserData.idToken)

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

interface IProps {
  initialUserData: {
    userId: number
    idToken: string
    email: string
  }
  initialApolloState: any
  children: ReactNode
}
