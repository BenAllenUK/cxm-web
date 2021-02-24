import { IOptionSections, OptionType } from 'components/common/option-controls'
import { useTranslation } from 'next-i18next'
import { ArticleFragment } from 'generated/graphql'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'
import LinkUncontrolled from './LinkUncontrolled'
import ExternalLinkIcon from 'images/icons/external-link.svg'
import LinkIcon from 'images/icons/link.svg'
import { isURL } from 'components/editor/utils/links'
import createPositionModal from 'components/common/modals/position'

enum LinkSections {
  Results = 0,
  Actions,
}

enum LinkActions {
  NewPage = 0,
  NewLink,
}

const { Provider, useModal } = createPositionModal()
export const useLinkModal = useModal

const Component = ({ articles, ...otherProps }: IProps) => {
  const { enabled, position, hideControls } = useLinkModal()
  const [filterText, setFilterText] = useState<string | null>(null)

  const { t } = useTranslation(['editor'])

  const _onValueChange = (value: string) => {
    setFilterText(value)
  }

  let filteredArticles = articles || []
  if (filterText) {
    filteredArticles = articles.filter((item) => item.title.indexOf(filterText) > -1)
  }

  const isUrl = isURL(filterText || '')

  const sections: IOptionSections[] = [
    {
      id: LinkSections.Results,
      title: t('link.header'),
      items: filteredArticles.slice(0, 10).map((item) => ({
        id: item.id,
        type: OptionType.Button,
        title: item.title,
      })),
      showLine: true,
    },
    {
      id: LinkSections.Actions,
      items: [
        isUrl
          ? {
              id: LinkActions.NewLink,
              type: OptionType.Button,
              icon: <LinkIcon style={{ width: 16 }} />,
              title: `${t('link.newUrl')}`,
            }
          : {
              id: LinkActions.NewPage,
              type: OptionType.Button,
              icon: <ExternalLinkIcon style={{ width: 16 }} />,
              title: `${t('link.newPagePrefix')} "${filterText}" ${t('link.newPageSuffix')}`,
            },
      ],
      showLine: false,
    },
  ]

  const _onItemClick = (sectionId: number, id: number) => {
    switch (sectionId) {
      case LinkSections.Actions:
        if (id === LinkActions.NewLink) {
          // Insert new link
        } else if (id === LinkActions.NewPage) {
          // insert new page with name
          // Insert internal link
        }
        return
      case LinkSections.Results:
        // Insert internal link
        return
    }
  }

  return (
    <>
      {enabled && position && (
        <LinkUncontrolled
          sections={filterText ? sections : []}
          style={{ left: position.x, top: position.y }}
          filterText={filterText}
          onDismiss={hideControls}
          onValueChange={_onValueChange}
          onItemClick={_onItemClick}
          {...otherProps}
        />
      )}
    </>
  )
}

const Link = { Provider, Component }

export default Link

interface IProps {
  articles: ArticleFragment[]
}
