import { BlockType } from 'components/editor/blocks/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode, RefObject, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'

const ControlledModals = ({ children, onBlockItemClick }: IProps) => {
  return (
    <div>
      <BlockControls.Component onBlockItemClick={onBlockItemClick} />
      <PageControls.Component onClick={() => {}} />
      <TextControls.Component />
      {children}
    </div>
  )
}

const Modals = (props: IProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ position: 'relative' }} ref={bodyRef}>
      <TextControls.Provider rootRef={bodyRef}>
        <PageControls.Provider rootRef={bodyRef}>
          <BlockControls.Provider rootRef={bodyRef}>
            <ControlledModals {...props} />
          </BlockControls.Provider>
        </PageControls.Provider>
      </TextControls.Provider>
    </div>
  )
}

export default memo(Modals)

interface IProps {
  children: ReactNode
  onBlockItemClick: (index: number, key: BlockType) => void
}
