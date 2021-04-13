import styles from './MediaControls.module.scss'
import MoreIcon from 'images/icons/more.svg'
import { useRef, ReactNode } from 'react'
import { useMediaControlModal } from 'components/editor/modals/media-controls'

const TopBar = ({ setWriteNewCaption, setCreateComment, onDeleteBlock, isButton, addLink }: IProps) => {
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
  const Option = ({ option, icon, onClick }: IOptionProps) => {
    const node = option ? option : icon
    return (
      <div className={option ? styles.option : styles.icon} onClick={onClick}>
        {node}
      </div>
    )
  }

  return (
    <div>
      {!isButton && (
        <div className={styles.bar} ref={ref}>
          <Option onClick={setWriteNewCaption} option={'caption'} />
          <Option onClick={setCreateComment} option={'comment'} />
          <Option onClick={onDeleteBlock} option={'delete'} />
          <Option onClick={onClick} icon={<MoreIcon className={styles.moreIcon} width={14} height={14} fill={'#FFFFFF'} />} />
        </div>
      )}
      {isButton && (
        <div className={styles.bar} ref={ref}>
          <Option onClick={addLink} option={'add link'} />
          <Option onClick={onDeleteBlock} option={'delete'} />
        </div>
      )}
    </div>
  )
}

export default TopBar

interface IOptionProps {
  icon?: ReactNode
  option?: string
  onClick?: any
}

interface IProps {
  setWriteNewCaption?: () => void
  setCreateComment?: () => void
  addLink?: () => void
  onDeleteBlock: () => void
  isButton?: boolean
}
