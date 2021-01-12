import { Provider } from 'react-redux'

import { useStore } from 'store'

// TODO: Lazy load apollo?
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'config/graphql'

export default function Root({ initialApolloState, initialReduxState, children }: any) {
  const store = useStore(initialReduxState)
  const apolloClient = useApollo(initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>{children}</Provider>
    </ApolloProvider>
  )
}
