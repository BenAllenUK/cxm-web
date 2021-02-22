import { BlockType } from 'components/editor/blocks/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode, RefObject, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'
import TextStyle from './text-style'
import Link from './link'
import { ArticleFragment } from 'generated/graphql'

const ControlledModals = ({ articles, children, onBlockItemClick }: IProps) => {
  return (
    <div>
      <BlockControls.Component onBlockItemClick={onBlockItemClick} />
      <PageControls.Component onClick={() => {}} />
      <TextControls.Component />
      <TextStyle.Component />
      <Link.Component articles={articles} />
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
            <TextStyle.Provider rootRef={bodyRef}>
              <Link.Provider rootRef={bodyRef}>
                <ControlledModals {...props} />
              </Link.Provider>
            </TextStyle.Provider>
          </BlockControls.Provider>
        </PageControls.Provider>
      </TextControls.Provider>
    </div>
  )
}

export default memo(Modals)

interface IProps {
  articles: ArticleFragment[]
  children: ReactNode
  onBlockItemClick: (index: number, key: BlockType) => void
}
