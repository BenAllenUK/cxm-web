import { memo } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceObject } from 'components/editor/blocks/types'

export const SourceTabBar = ({ sources, selectSource, selected, setPictures }: IProps) => {
  const Source = ({ source }: any) => {
    const _onClick = () => {
      selectSource(source)
      setPictures([])
    }
    return (
      <div className={selected == source.name ? styles.selectedSource : styles.source} onClick={_onClick}>
        <div>{source.name}</div>
      </div>
    )
  }

  return (
    <div className={styles.tabBar}>
      {sources.map((source) => {
        return <Source key={source.name} source={source} />
      })}
    </div>
  )
}

interface IProps {
  selectSource: (item: MediaSourceObject) => void
  setPictures: (item: any) => void
  selected: string
  sources: MediaSourceObject[]
}

export default memo(SourceTabBar)
