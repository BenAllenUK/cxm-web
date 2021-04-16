import { Block, BlockData, BlockDataText, BlockType, MediaSourceType } from 'components/editor/blocks/types'
import { memo, ReactNode, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'
import TextStyle, { useFocusedBlock } from './text-style'
import MediaControls, { useFileControlModal } from './file-more-controls'
import Link from './link'
import BlockControlsContext, { useBlockControlsContext } from './block-controls/BlockControlsContext'
import PageControlsTargetContext from 'components/navigation/sidebar/modals/page-controls/PageControlsTargetContext'
import { Article } from 'operations/articles/types'
import styles from '../Editor.module.scss'
import DeleteConfirmation from './delete-confirmation'
import { BlockTypeProperties } from '../blocks'
import { removeLinkPlaceholders, applyLinkToPlaceholder } from 'utils/html/links'
import createArticleEmpty from 'utils/article/createEmptyArticle'
import FileSelection from './file-selection'
import FileMoreControls from './file-more-controls'

const ControlledModals = ({ blocks, articles, children, onUpsertArticles, onBlocksUpsert, onModifyBlockType }: IProps) => {
  const { id, filterText } = useBlockControlsContext()
  const { blockId } = useFocusedBlock()
  const { hideControls: fileControlModalHide, payload: fileControlModalPayload } = useFileControlModal()

  const _onModifyBlockType = (key: BlockType) => {
    onModifyBlockType(id, key)
  }

  const onNewPage = (name: string) => {
    const newArticle = createArticleEmpty(null, null, 999) //TODO: update position

    onUpsertArticles([{ ...newArticle, title: name }])
  }

  const _onApplyLink = async (link: string) => {
    const [block] = blocks.filter((item) => item.id === blockId)
    if (!block) {
      console.error(`No block found`)
      return
    }

    if (!BlockTypeProperties[block.type].isEditable) {
      console.error(`Block is not editable`)
      return
    }

    const value = (block.payload as BlockDataText).value
    const cleanedValue = await applyLinkToPlaceholder(value, link)

    const newBlock = { ...block, payload: { value: cleanedValue } }
    onBlocksUpsert([newBlock])
  }

  const _onClearLinkPlaceholder = async () => {
    const [block] = blocks.filter((item) => item.id === blockId)
    if (!block) {
      console.error(`No block found`)
      return
    }

    if (!BlockTypeProperties[block.type].isEditable) {
      console.error(`Block is not editable`)
      return
    }

    const value = (block.payload as BlockDataText).value

    const cleanedValue = await removeLinkPlaceholders(value)

    const newBlock = { ...block, payload: { value: cleanedValue } }
    onBlocksUpsert([newBlock])
  }

  const _onUpdateFile = (value: BlockData) => {
    const blockId = (fileControlModalPayload as { blockId: number }).blockId
    const [block] = blocks.filter((item) => item.id === blockId)
    if (!block) {
      console.error(`No block found`)
      return
    }

    fileControlModalHide()

    onBlocksUpsert([{ ...block, payload: { ...block.payload, ...value } }])
  }

  return (
    <>
      <BlockControls.Component filterText={filterText} id={id} onBlockItemClick={_onModifyBlockType} />
      <PageControls.Component onClick={() => {}} />
      <MediaControls.Component onClick={() => {}} />
      <TextControls.Component />
      <TextStyle.Component />
      <DeleteConfirmation.Component onAccept={() => {}} />
      <Link.Component
        onNewPage={onNewPage}
        onClearLinkPlaceholder={_onClearLinkPlaceholder}
        onApplyLink={_onApplyLink}
        articles={articles}
      />
      <FileSelection.Component onUpdate={_onUpdateFile} onD />
      <FileMoreControls.Component onClick={() => {}} />
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
                      <FileSelection.Provider>
                        <FileMoreControls.Provider rootRef={bodyRef}>
                          <ControlledModals {...props} />
                        </FileMoreControls.Provider>
                      </FileSelection.Provider>
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
  blocks: Block[]
  children: ReactNode
  onUpsertArticles: (articles: Article[]) => Promise<Article[]>
  onBlocksUpsert: (blocks: Block[]) => void
  onModifyBlockType: (index: number, key: BlockType) => void
}
