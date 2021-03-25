import {
  withOmneaCustomPage,
  withOmneaStaticPaths,
  withOmneaStaticProps,
  BlockType,
  Text,
  Divider,
  Image,
  BlockDataText,
  BlockDataMedia,
  AppPropsWithOmnea
} from '@omnea-digital/nextjs'

const CustomPage = ({ article }: AppPropsWithOmnea) => {
  return (
    <div>
      {article && (
        <>
          <h1>{article.title}</h1>
          {article.blocks.map((item) => {
            switch (item.type) {
              case BlockType.TEXT:
              case BlockType.H1:
              case BlockType.H2:
              case BlockType.H3:
              case BlockType.CALLOUT:
              case BlockType.CODE:
              case BlockType.QUOTE:
                return (
                  <Text
                    type={item.type}
                    content={item.payload as BlockDataText}
                  />
                )
              case BlockType.DIVIDER:
                return <Divider />
              case BlockType.IMAGE:
                return <Image content={item.payload as BlockDataMedia} />
              default:
                return <div />
            }
          })}
        </>
      )}
    </div>
  )
}

export default withOmneaCustomPage(CustomPage)

export const getStaticPaths = withOmneaStaticPaths(async () => {
  return {
    paths: [{ params: { path: ['other'] } }],
    fallback: true
  }
})

export const getStaticProps = withOmneaStaticProps(async (context) => {
  const path = context.params?.path
  return { props: {} }
})
