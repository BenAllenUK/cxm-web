import {
  withOmneaPage,
  withOmneaStaticPaths,
  withOmneaStaticProps
} from '@omnea-digital/nextjs'

const DefaultPage = () => (
  <div>
    <h1>Default page</h1>
  </div>
)

export default withOmneaPage(DefaultPage)

export const getStaticPaths = withOmneaStaticPaths(async () => {
  return {
    paths: [
      { params: { path: ['asdf', 'bar'] } },
      { params: { path: ['s', 'd'] } }
    ],
    fallback: true
  }
})

// This also gets called at build time
export const getStaticProps = withOmneaStaticProps(async () => {
  return { props: {} }
})
