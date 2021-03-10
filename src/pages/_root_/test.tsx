import { initializeApollo } from 'config/graphql'
import { GetServerSidePropsContext } from 'next'
import GET_PROJECT_ONE from 'queries/projects/GET_PROJECT_ONE.gql'
import GET_ARTICLE_ONE from 'queries/articles/GET_ARTICLE_ONE.gql'
import ARTICLE_FRAGMENT from 'queries/articles/ARTICLE_FRAGMENT.gql'
import debounceMerged from 'utils/func/debounceMerged'

import {
  useCreateArticleMutation,
  useGetArticleOneQuery,
  useGetProjectOneQuery,
  useUpsertArticlesMutation,
  useGetProjectOneSubscriptionSubscription,
  ArticleFragment,
} from 'generated/graphql'
import Root, { useUser } from 'components/root'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import keyBy from 'lodash/keyBy'

const projectSlug = 'gimme'
const articleSlug = '123'

export default function Test(props: any) {
  return (
    <Root {...props}>
      <Content />
    </Root>
  )
}

type ArticleFragmentList = { [key: number]: ArticleFragment }

function Content() {
  // const { projectSlug, articleSlug } = useEditor()

  if (projectSlug === null || articleSlug === null) {
    return <div />
  }

  let projectsData = null

  const projectsDataQueryResponse = useGetProjectOneQuery({
    variables: {
      slug: projectSlug,
    },
  })

  projectsData = projectsDataQueryResponse?.data

  // Stops the local query cache from working
  // Move to subscription after fetch
  // -------------
  // if (typeof window !== 'undefined') {
  //   const { data } = useGetProjectOneSubscriptionSubscription({
  //     variables: {
  //       slug: projectSlug,
  //     },
  //   })
  //   projectsData = data ?? projectsData
  // }

  // const { data: projectsData } = useGetProjectOneSubscriptionSubscription({
  //   variables: {
  //     slug: projectSlug,
  //   },
  // })

  const [project] = projectsData?.projects || []
  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
    return <div />
  }

  // Check to see if article Id is in article data
  // article id might not be part of this project

  let articleData = null

  const response = useGetArticleOneQuery({
    variables: {
      slug: null,
      path: articleSlug,
    },
  })

  articleData = response?.data

  // Stops the local query cache from working
  // Move to subscription after fetch
  // if (typeof window !== 'undefined') {
  //   const { data } = useGetArticleOneSubscriptionSubscription({
  //     variables: {
  //       slug: articleSlug,
  //     },
  //   })
  //   articleData = data ?? articleData
  // }

  const [article] = articleData?.articles || []

  const [createArticleMutation] = useCreateArticleMutation()
  const [upsertArticlesMutation] = useUpsertArticlesMutation()

  const articlesObject = keyBy(project.articles || [], 'id')

  const _onChange = useCallback(
    async (items: { id: number; value: string }[]) => {
      const { data } = await upsertArticlesMutation({
        variables: {
          objects: items.map((item) => {
            const { __typename, ...existingArticle } = articlesObject[item.id]
            return {
              ...existingArticle,
              title: item.value,
            }
          }),
        },
      })
    },
    [articlesObject, upsertArticlesMutation]
  )

  const _onDebouncedBlockUpsert = debounceMerged<{ id: number; value: string }>(_onChange, 1000, 'id') // debounce(_onChange, 1000)

  const _onListChange = (e: any, id: number) => {
    _onDebouncedBlockUpsert({ id, value: e.target.value })
  }

  const _onChangePosition = async (id: number, newPosition: number) => {
    const { __typename, ...existingArticle } = articlesObject[id]

    const { data } = await upsertArticlesMutation({
      optimisticResponse: {},
      update: (cache, { data }) => {
        cache.writeFragment({
          id: `articles:${id}`,
          fragment: ARTICLE_FRAGMENT,
          data: { ...existingArticle, position: newPosition },
        })
      },
      variables: {
        objects: {
          ...existingArticle,
          position: newPosition,
        },
      },
    })
  }

  return (
    <div>
      <List items={articlesObject} onChange={_onListChange} onChangePosition={_onChangePosition} />
    </div>
  )
}

const List = memo(
  ({
    items: itemsObject,
    onChange,
    onChangePosition,
  }: {
    items: ArticleFragmentList
    onChange: (e: any, id: number) => void
    onChangePosition: (id: number, newPosition: number) => void
  }) => {
    const items: ArticleFragment[] = Object.keys(itemsObject || []).map((key) => {
      return itemsObject[Number(key)]
    })

    return (
      <ul>
        {items
          .sort((a: ArticleFragment, b: ArticleFragment) => a.position - b.position)
          .map((item) => {
            return (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                position={item.position}
                onChange={onChange}
                onChangePosition={onChangePosition}
              />
            )
          })}
      </ul>
    )
  }
)

const Item = memo(
  ({
    id,
    title: defaultTitle,
    position,
    onChange,
    onChangePosition,
  }: {
    id: number
    title: string
    position: number
    onChange: (e: any, id: number) => void
    onChangePosition: (id: number, newPosition: number) => void
  }) => {
    const [title, setTitle] = useState<string>(defaultTitle)

    const _onChange = (e: any) => {
      setTitle(e.target.value)
      onChange(e, id)
    }

    const _onChangePosition = (e: any) => {
      const newPosition = Number(ref.current?.value)
      if (newPosition) {
        onChangePosition(id, newPosition)
      }
    }

    useEffect(() => {
      if (title !== defaultTitle) {
        setTitle(defaultTitle)
      }
    }, [defaultTitle])

    const ref = useRef<HTMLInputElement>(null)

    return (
      <li>
        <input type="text" onChange={_onChange} value={title} />
        {position}
        <input ref={ref} type="text" />
        <button onClick={_onChangePosition}>Update</button>
      </li>
    )
  }
)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = initializeApollo()

  const { data: projectsData } = await client.query({
    query: GET_PROJECT_ONE,
    variables: { slug: projectSlug },
  })

  const [project] = projectsData?.projects || []

  if (!project) {
    console.error(`Project not found: ${projectSlug}`)
    return {
      notFound: true,
    }
  }

  const { data: articleData } = await client.query({
    query: GET_ARTICLE_ONE,
    variables: { slug: articleSlug },
  })

  const [article] = articleData?.articles || []

  if (!article) {
    console.error(`Article not found: ${articleSlug}`)
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialApolloState: client.cache.extract(),
      initialUserContext: {
        userId: 1,
        organisationId: 1,
        projects: [],
      },
      initialEditorContext: {
        projectSlug: project.slug,
        articlePath: article.path,
      },
      namespacesRequired: ['common', 'editor'],
    },
  }
}
