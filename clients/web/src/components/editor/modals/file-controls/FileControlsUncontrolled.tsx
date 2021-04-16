import styles from './FileControlsUncontrolled.module.scss'
import MoreIcon from 'images/icons/more.svg'
import { useRef, ReactNode, HTMLProps } from 'react'
import { useFileControlModal } from 'components/editor/modals/file-more-controls'
import Option from './Option'

const FileControlsUncontrolled = ({ isButton, onWriteNewCaption, onDeleteBlock, onAddLink, ...props }: IProps) => {
  const { showControls } = useFileControlModal()

  const ref = useRef<HTMLDivElement>(HTMLDivElement.prototype)

  const onMoreClick = (e: any) => {
    const { top: blockTop, left: blockLeft } = ref.current.getBoundingClientRect()
    showControls({
      x: blockLeft,
      y: blockTop + 30,
    })
    e.stopPropagation()
  }

  return (
    <div {...props}>
      {!isButton && (
        <div className={styles.bar} ref={ref}>
          <Option onClick={onWriteNewCaption} option={'caption'} />
          <Option onClick={onDeleteBlock} option={'delete'} />
          <Option onClick={onMoreClick} icon={<MoreIcon className={styles.moreIcon} width={14} height={14} fill={'#FFFFFF'} />} />
        </div>
      )}
      {isButton && (
        <div className={styles.bar} ref={ref}>
          <Option onClick={onAddLink} option={'add link'} />
          <Option onClick={onDeleteBlock} option={'delete'} />
        </div>
      )}
    </div>
  )
}

export default FileControlsUncontrolled

interface IProps extends HTMLProps<HTMLDivElement> {
  isButton?: boolean
  onWriteNewCaption?: () => void
  onAddLink?: () => void
  onDeleteBlock: () => void
}
