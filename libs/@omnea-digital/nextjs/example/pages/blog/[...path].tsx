import {
  withOmneaPage,
  withOmneaStaticPaths,
  withOmneaStaticProps
} from '@omnea-digital/nextjs'

import type { AppProps } from 'next/app'

const FallbackPage = (props: AppProps) => {
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  )
}

export default withOmneaPage(FallbackPage)

export const getStaticPaths = withOmneaStaticPaths(async () => {
  return {
    paths: [],
    fallback: true
  }
})

// This also gets called at build time
export const getStaticProps = withOmneaStaticProps(async () => {
  return { props: {}, revalidate: 1 }
})
