import SettingsControls from 'components/common/settings-controls'
import { CSSProperties } from 'react'
import { Article } from 'operations/articles/types'
import { OptionType, ISettingsSections } from 'components/common/settings-controls/'
import styles from './ConfigControlUncontrolled.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

const ConfigControlUncontrolled = ({ style, article, onClick, onDismiss, onArticleUpdatePath, onUpsertArticles }: IProps) => {
  if (!article) {
    return <div />
  }
  const _onClick = (_: number, itemId: number) => {
    onClick(itemId)
  }

  const sections: ISettingsSections[] = [
    // ISettingsSections
    {
      id: 1,
      title: 'OPTIONS',
      children: [
        // ISettingsSubSections
        {
          id: 2,
          title: 'General',
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1, marginRight: 8 }} icon={faCog} />,
          children: [
            //IInnerSection
            {
              id: 3,
              label: 'General Title',
              showTitleLine: true,
              children: [
                // ISettingsElements
                {
                  id: 4,
                  value: article.title,
                  label: 'Title',
                  hint: 'Put your article title here',
                  placeholder: 'Article Title',
                  onUpdate: (title: string) => {
                    onUpsertArticles({ ...article, title })
                  },
                  type: OptionType.TextInput,
                },
                {
                  id: 5,
                  label: 'URL Path',
                  value: article.path,
                  placeholder: 'new-page-1',
                  onUpdate: onArticleUpdatePath,
                  type: OptionType.TextInput,
                  isSnakeCase: true,
                },
                {
                  id: 6,
                  label: 'Publish',
                  hint: 'Publish the article',
                  state: article.published || false,
                  onUpdate: (published: boolean) => {
                    onUpsertArticles({ ...article, published })
                  },
                  type: OptionType.Switch,
                },
                {
                  id: 7,
                  label: 'Publish Date',
                  date: article.publishAt,
                  type: OptionType.Date,
                  onUpdate: (publishAt: string) => {
                    onUpsertArticles({ ...article, publishAt })
                  },
                },
                {
                  id: 8,
                  label: 'Author Name',
                  value: article.publishedByName,
                  placeholder: '',
                  onUpdate: (publishedByName: string) => {
                    onUpsertArticles({ ...article, publishedByName })
                  },
                  type: OptionType.TextInput,
                },
                {
                  id: 9,
                  label: 'Sample Deeper options',
                  text: 'options',
                  type: OptionType.Button,
                  hint: 'This button is a test',
                  children: {
                    id: 19,
                    title: 'Deeper',
                    children: [
                      {
                        id: 22,
                        label: 'General Title',
                        showTitleLine: true,
                        children: [
                          {
                            id: 23,
                            label: 'More setting',
                            type: OptionType.TextInput,
                            value: '',
                            placeholder: 'placeholder',
                            onUpdate: () => null,
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 24,
      title: 'Another Section',
      children: [
        // ISettingsSubSections
        {
          id: 25,
          title: 'For test',
          icon: <FontAwesomeIcon style={{ fontSize: 14, marginBottom: 1, marginRight: 8 }} icon={faCog} />,
          children: [],
        },
      ],
    },
  ]

  return (
    <>
      <SettingsControls
        style={style}
        iconClassName={styles.icon}
        onItemClick={_onClick}
        onDismiss={onDismiss}
        onArticleUpdatePath={onArticleUpdatePath}
        onUpsertArticles={onUpsertArticles}
        article={article}
        sections={sections}
      />
    </>
  )
}

export default ConfigControlUncontrolled

interface IProps {
  style: CSSProperties
  article: Article | null
  onClick: (key: number) => void
  onArticleUpdatePath: (renameValue: string) => void
  onUpsertArticles: (value: Article) => void
  onDismiss: () => void
}
