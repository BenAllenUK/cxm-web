import {
  withOmneaPage,
  withOmneaStaticPaths,
  withOmneaStaticProps
} from '@omnea-digital/nextjs'

const FallbackPage = () => {
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
