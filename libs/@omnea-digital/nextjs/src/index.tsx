import withInternalClient from './client'

const defaultClient = withInternalClient()

export const withOmneaStaticPaths = defaultClient.withOmneaStaticPaths
export const withOmneaStaticProps = defaultClient.withOmneaStaticProps
export const withOmneaPage = defaultClient.withOmneaPage
export const withClient = withInternalClient
