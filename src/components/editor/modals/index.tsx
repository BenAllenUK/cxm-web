import { BlockType } from 'components/editor/blocks/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode, RefObject, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'

const Modals = ({ children, onBlockItemClick }: IProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ position: 'relative' }} ref={bodyRef}>
      <PageControls onClick={() => {}}>
        <BlockControls rootRef={bodyRef} onBlockItemClick={onBlockItemClick}>
          <TextControls rootRef={bodyRef}>{children}</TextControls>
        </BlockControls>
      </PageControls>
    </div>
  )
}

export default memo(Modals)

interface IProps {
  children: ReactNode
  onBlockItemClick: (index: number, key: BlockType) => void
}
