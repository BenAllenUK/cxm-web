import { Block, BlockDataText, BlockType } from 'components/editor/blocks/types'
import { useState, useContext, memo, useCallback, createContext, ReactNode, RefObject, useRef } from 'react'

import BlockControls from './block-controls'
import TextControls from './text-controls'
import PageControls from './page-controls'
import ConfigControls from './config-controls'
import TextStyle, { useFocusedBlock } from './text-style'
import MediaControls from './media-controls'
import Link from './link'
import BlockControlsContext, { useBlockControlsContext } from './block-controls/BlockControlsContext'
import PageControlsTargetContext from 'components/navigation/sidebar/modals/page-controls/PageControlsTargetContext'
import { Article } from 'operations/articles/types'
import styles from '../Editor.module.scss'
import DeleteConfirmation from './delete-confirmation'
import { BlockTypeProperties } from '../blocks'
import { removeLinkPlaceholders, applyLinkToPlaceholder } from 'utils/html/links'
import createArticleEmpty from 'utils/article/createEmptyArticle'
import { createSlug } from 'utils/article/createSlug'
import updateChildPaths from 'utils/article/updateChildPaths'

const ControlledModals = ({ blocks, articles, children, onUpsertArticles, onBlocksUpsert, onModifyBlockType }: IProps) => {
  const { id, filterText } = useBlockControlsContext()
  const { blockId } = useFocusedBlock()

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

  const _onArticleRenameSubmit = async (articleId: number | null, renameValue: string) => {
    if (!renameValue || !articleId) {
      return
    }

    const [article] = articles.filter((item) => item.id === articleId)
    if (!article) {
      console.error(`Article not found: ${articleId}`)
      return
    }

    return await onUpsertArticles([{ ...article, title: renameValue }])
  }

  const _onUpsertArticles = async (articleId: number | null, value: Article) => {
    if (!articleId) {
      return
    }
    const [article] = articles.filter((item) => item.id === articleId)
    if (!article) {
      console.error(`Article not found: ${articleId}`)
      return
    }

    return await onUpsertArticles([{ ...value }])
  }

  const _onArticleUpdatePath = async (articleId: number | null, renameValue: string) => {
    if (!renameValue || !articleId) {
      return
    }

    const [article] = articles.filter((item) => item.id === articleId)
    if (!article) {
      console.error(`Article not found: ${articleId}`)
      return
    }
    const basePathItems = article.path.split('/').slice(0, -1)
    const newSlug = createSlug(renameValue)
    const path = basePathItems.length > 0 ? [...basePathItems, newSlug].join('/') : newSlug
    const oldPath = article.path
    const newPath = path

    // WARNING - Recursive loop for path editing
    const modifiedChildrenArticles = updateChildPaths(articles, oldPath, newPath, articleId)

    return await onUpsertArticles([{ ...article, path: renameValue }, ...modifiedChildrenArticles])
  }

  return (
    <>
      <BlockControls.Component filterText={filterText} id={id} onBlockItemClick={_onModifyBlockType} />
      <PageControls.Component onClick={() => {}} />
      <ConfigControls.Component
        articles={articles}
        onArticleRenameSubmit={_onArticleRenameSubmit}
        onArticleUpdatePath={_onArticleUpdatePath}
        onUpsertArticles={_onUpsertArticles}
      />
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
              <ConfigControls.Provider rootRef={bodyRef}>
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
              </ConfigControls.Provider>
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
