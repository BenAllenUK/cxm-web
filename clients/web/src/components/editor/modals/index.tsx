import { BlockType } from 'components/editor/blocks/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode, RefObject, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'
import MediaControls from './media-controls'
import TextStyle from './text-style'
import Link from './link'
import BlockControlsContext, { useBlockControlsContext } from './block-controls/BlockControlsContext'
import PageControlsTargetContext from 'components/navigation/sidebar/modals/page-controls/PageControlsTargetContext'
import { Article } from 'operations/articles/types'
import styles from '../Editor.module.scss'
import DeleteConfirmation from './delete-confirmation'

const ControlledModals = ({ articles, children, onModifyBlockType }: IProps) => {
  const { id, filterText } = useBlockControlsContext()

  const _onModifyBlockType = (key: BlockType) => {
    onModifyBlockType(id, key)
  }
  return (
    <>
      <BlockControls.Component filterText={filterText} id={id} onBlockItemClick={_onModifyBlockType} />
      <PageControls.Component onClick={() => {}} />
      <MediaControls.Component onClick={() => {}} />
      <TextControls.Component />
      <TextStyle.Component />
      <DeleteConfirmation.Component onAccept={() => {}} />
      <Link.Component articles={articles} />
      {children}
    </>
  )
}

const Modals = (props: IProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.modalContainer} ref={bodyRef}>
      <DeleteConfirmation.Provider>
        <TextControls.Provider rootRef={bodyRef}>
          <PageControls.Provider rootRef={bodyRef}>
            <PageControlsTargetContext.Provider>
              <BlockControls.Provider rootRef={bodyRef}>
                <BlockControlsContext.Provider>
                  <TextStyle.Provider rootRef={bodyRef}>
                    <Link.Provider rootRef={bodyRef}>
                      <MediaControls.Provider rootRef={bodyRef}>
                        <ControlledModals {...props} />
                      </MediaControls.Provider>
                    </Link.Provider>
                  </TextStyle.Provider>
                </BlockControlsContext.Provider>
              </BlockControls.Provider>
            </PageControlsTargetContext.Provider>
          </PageControls.Provider>
        </TextControls.Provider>
      </DeleteConfirmation.Provider>
    </div>
  )
}

export default memo(Modals)

interface IProps {
  articles: Article[]
  children: ReactNode
  onModifyBlockType: (index: number, key: BlockType) => void
}
