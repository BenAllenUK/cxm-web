import createPositionModal from 'components/common/modals/position'
import styles from './MediaControls.module.scss'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'

const { Provider, useModal } = createPositionModal()

export const useMediaControlModal = useModal

const Component = ({ hoverRef, setWriteNewCaption, setCreateComment }: IProps) => {
  const { enabled, position, hideControls } = useMediaControlModal()
  const Option = ({ name, onClick }: IOptionProps) => {
    return (
      <div ref={hoverRef} className={styles.option} onClick={onClick}>
        {name}
      </div>
    )
  }

  return (
    <div className={styles.bar}>
      <Option onClick={setWriteNewCaption} name={'caption'} />
      <Option onClick={setCreateComment} name={'comment'} />
    </div>
  )
}

const MediaControl = { Provider, Component }

export default MediaControl

interface IOptionProps {
  name: string
  onClick?: any
}

interface IProps {
  setWriteNewCaption: () => void
  setCreateComment: () => void
  hoverRef: RefObject<HTMLDivElement>
}
