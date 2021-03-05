import { memo } from 'react'
import styles from './MediaSelector.module.scss'
import { MediaSourceType, MediaSourceObject } from './types'

export const SourceTabBar = ({ sources, selectSource, selected, setPictures }: IProps) => {
  return (
    <div className={styles.tabBar}>
      {sources.map((source) => (
        <div
          key={source.name}
          className={selected == source.name ? styles.selectedSource : styles.source}
          onClick={() => {
            selectSource(source)
            setPictures([])
          }}
        >
          <div>{source.name}</div>
        </div>
      ))}
    </div>
  )
}

interface IProps {
  selectSource: React.Dispatch<React.SetStateAction<{ name: MediaSourceType; type: MediaSourceType }>>
  setPictures: React.Dispatch<React.SetStateAction<[]>>
  selected: string
  sources: MediaSourceObject[]
}

export default memo(SourceTabBar)
