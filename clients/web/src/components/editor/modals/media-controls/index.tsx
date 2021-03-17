import createPositionModal from 'components/common/modals/position'
import styles from './MediaControls.module.scss'
import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from 'react'

const { Provider, useModal } = createPositionModal()

export const useMediaControlModal = useModal

const Component = ({ setWriteNewCaption, setCreateComment, deleteBlock }: IProps) => {
  const { enabled, position, hideControls } = useMediaControlModal()
  const Option = ({ name, onClick }: IOptionProps) => {
    return (
      <div className={styles.option} onClick={onClick}>
        {name}
      </div>
    )
  }

  return (
    <div className={styles.bar}>
      <Option onClick={setWriteNewCaption} name={'caption'} />
      <Option onClick={setCreateComment} name={'comment'} />
      <Option onClick={deleteBlock} name={'delete'} />
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
  deleteBlock: () => void
}
