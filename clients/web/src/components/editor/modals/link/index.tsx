import { IOptionSections, OptionType } from 'components/common/option-controls'
import useTranslation from 'utils/translations/useTranslation'
import { useState } from 'react'
import LinkUncontrolled from './LinkUncontrolled'
import ExternalLinkIcon from 'images/icons/external-link.svg'
import LinkIcon from 'images/icons/link.svg'
import { isURL } from 'utils/misc/links'
import createPositionModal from 'components/common/modals/position'
import { Article } from 'operations/articles/types'

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

const Component = ({ articles, onClearLinkPlaceholder, onApplyLink, onNewPage, ...otherProps }: IProps) => {
  const { enabled, position, hideControls, rootRef } = useLinkModal()
  const [filterText, setFilterText] = useState<string | null>(null)

  const { t } = useTranslation(['editor'])

  const _onValueChange = (value: string) => {
    setFilterText(value)
  }

  let filteredArticles = articles || []
  if (filterText) {
    filteredArticles = articles.filter((item) => item.title && item.title.indexOf(filterText) > -1)
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
          if (!filterText) return

          onApplyLink(filterText)
        } else if (id === LinkActions.NewPage) {
          if (!filterText) return

          onNewPage(filterText)
        }
        return
      case LinkSections.Results:
        const [article] = filteredArticles.filter((item) => item.id === id)

        if (!article) {
          console.error(`Article not found`)
          return
        }

        onApplyLink(`/${article.path}`)
    }
  }

  const _onDismiss = () => {
    onClearLinkPlaceholder()

    hideControls()
  }

  return (
    <>
      {enabled && position && (
        <LinkUncontrolled
          rootRef={rootRef}
          position={position}
          sections={filterText ? sections : []}
          filterText={filterText}
          onDismiss={_onDismiss}
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
  articles: Article[]
  onApplyLink: (link: string) => void
  onClearLinkPlaceholder: () => void
  onNewPage: (value: string) => void
}
