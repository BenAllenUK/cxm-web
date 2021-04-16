import { memo } from 'react'
import styles from './FileSelectionUncontrolled.module.scss'
import { MediaSourceObject } from 'components/editor/blocks/types'

export const SourceTabBar = ({ sources, onSelectSource, selected, onSetPictures }: IProps) => {
  const Source = ({ source }: any) => {
    const _onClick = () => {
      onSelectSource(source)
      onSetPictures([])
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
  onSelectSource: (item: MediaSourceObject) => void
  onSetPictures: (item: any) => void
  selected: string
  sources: MediaSourceObject[]
}

export default memo(SourceTabBar)
