import TextInput from 'components/common/text-input/TextInput'
import styles from './Search.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import OptionControls, { IOptionSections, OptionType } from 'components/common/option-controls'
import { ArticleFragment } from 'generated/graphql'
import { useEffect, useRef, useState } from 'react'
import { Article } from 'operations/articles/types'

const Header = ({ filterText, onValueChange, onResetValue }: IHeaderProps) => {
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef.current.focus()
      document.execCommand('selectAll', false)
    }
  }, [inputRef])

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputIconContainer}>
        <FontAwesomeIcon className={styles.inputIcon} icon={faSearch} />
      </div>

      <div className={styles.inputArea}>
        <TextInput
          ref={inputRef}
          className={styles.inputAreaText}
          blurredPlaceholder={'Start search...'}
          html={filterText || ''}
          onChange={(e: any) => onValueChange(e.target.value)}
        />
      </div>

      <div className={styles.inputClearButton} onClick={onResetValue}>
        <FontAwesomeIcon className={styles.inputClearButtonIcon} icon={faTimesCircle} />
      </div>
    </div>
  )
}

interface IHeaderProps {
  filterText: string | null
  onValueChange: (value: string) => void
  onResetValue: () => void
}

const NoResults = () => {
  return (
    <div className={styles.emptyResults}>
      <div>
        <b>No results</b>
        <br />
        <p>Try different search terms</p>
      </div>
    </div>
  )
}

const Search = ({ articles, onItemClick, onDismiss }: ISearchProps & { onDismiss: () => void }) => {
  const [filterText, setFilterText] = useState<string | null>(null)

  const _onValueChange = (value: string) => {
    console.log(value)
    setFilterText(value)
  }

  const _onResetValue = () => {
    setFilterText('')
  }

  let filteredArticles = articles
  if (filterText) {
    filteredArticles = articles.filter((item) => item.title.indexOf(filterText) > -1)
  }

  const sections: IOptionSections[] = [
    {
      id: 0,
      items: filteredArticles.slice(0, 10).map((item) => ({
        id: item.id,
        type: OptionType.Button,
        title: item.title,
      })),
      showLine: false,
    },
  ]

  const _onClick = (_: number, id: number) => {
    onItemClick(id)
  }

  return (
    <div className={styles.background}>
      <>
        <OptionControls
          className={styles.container}
          sections={sections}
          footer={filteredArticles.length === 0 ? <NoResults /> : <div />}
          header={<Header filterText={filterText} onValueChange={_onValueChange} onResetValue={_onResetValue} />}
          onItemClick={_onClick}
          onDismiss={onDismiss}
        />
      </>
    </div>
  )
}

export default Search

export interface ISearchProps {
  articles: Article[]
  onItemClick: (id: number) => void
}
