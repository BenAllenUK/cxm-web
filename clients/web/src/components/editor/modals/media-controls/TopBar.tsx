import createPositionModal from 'components/common/modals/position'
import styles from './MediaControls.module.scss'
import MoreIcon from 'images/icons/more.svg'
import { createContext, ReactNode, RefObject, useCallback, useContext, useRef } from 'react'
import { useMediaControlModal } from 'components/editor/modals/media-controls'

const TopBar = ({ setWriteNewCaption, setCreateComment, deleteBlock }: IProps) => {
  const { showControls } = useMediaControlModal()

  const ref = useRef<HTMLDivElement>(HTMLDivElement.prototype)

  const onClick = (e: any) => {
    const { top: blockTop, left: blockLeft } = ref.current.getBoundingClientRect()
    showControls({
      x: blockLeft,
      y: blockTop + 30,
    })
    e.stopPropagation()
  }
  const Option = ({ name, onClick }: IOptionProps) => {
    return (
      <div className={styles.option} onClick={onClick}>
        {name}
      </div>
    )
  }

  return (
    <div className={styles.bar} ref={ref}>
      <Option onClick={setWriteNewCaption} name={'caption'} />
      <Option onClick={setCreateComment} name={'comment'} />
      <Option onClick={deleteBlock} name={'delete'} />
      <div className={styles.more} onClick={onClick}>
        <MoreIcon className={styles.moreIcon} width={14} height={14} fill={'#FFFFFF'} />
      </div>
    </div>
  )
}

export default TopBar

interface IOptionProps {
  name: string
  onClick?: any
}

interface IProps {
  setWriteNewCaption: () => void
  setCreateComment: () => void
  deleteBlock: () => void
}
