import Button from 'components/common/button/Button'
import { MouseEvent } from 'react'
import styles from './Cover.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import { faImage } from '@fortawesome/free-solid-svg-icons'
import useHover from 'utils/hooks/useHover'

const Cover = ({ image, onClick, onCoverImageChange }: IProps) => {
  const [ref, isControlsVisible] = useHover<HTMLDivElement>()

  const _onAddCoverClick = () => {
    if (!onCoverImageChange) return

    // TODO: Change url
    onCoverImageChange(
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80'
    )
  }

  const _onChangeCoverClick = () => {
    if (!onCoverImageChange) return
    onCoverImageChange(null)
  }

  const _onDeleteCoverClick = () => {
    if (!onCoverImageChange) return
    onCoverImageChange(null)
  }

  return (
    <div ref={ref} onClick={onClick}>
      <div className={image ? styles.coverFilled : styles.coverEmpty}>
        {image && (
          <div className={styles.background}>
            <Image src={image} layout="fill" objectFit="cover" />
          </div>
        )}
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls} style={{ visibility: isControlsVisible ? 'visible' : 'hidden' }}>
            {!image && (
              <Button onClick={_onAddCoverClick}>
                <FontAwesomeIcon style={{ fontSize: 16, marginRight: 8 }} icon={faImage} />
                Add cover
              </Button>
            )}
            {image && (
              <>
                <Button onClick={_onChangeCoverClick}>
                  <FontAwesomeIcon style={{ fontSize: 14, marginRight: 8 }} icon={faImage} />
                  Change cover
                </Button>
                <Button onClick={_onDeleteCoverClick}>Delete cover</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cover

interface IProps {
  image?: string | null
  onClick: (e: MouseEvent) => void
  onCoverImageChange?: (value: string | null) => void
}
