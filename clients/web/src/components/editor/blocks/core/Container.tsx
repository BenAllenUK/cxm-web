import { useCallback, useState, memo, ReactNode, DragEvent } from 'react'
import useHover from 'utils/hooks/useHover'
import fileTypeToBlockType from '../../utils/fileTypeToBlockType'
import { BlockData, BlockDataMediaUpload, MediaSourceType, BlockDataMedia, BlockType } from 'components/editor/blocks/types'
import { BLOCK_CONTAINER_VERTICAL_PADDING } from '..'
import styles from './Container.module.scss'
import Controls from './Controls'

const Container = ({
  index,
  enableHandle,
  initialHeight,
  onDoubleClick,
  onClick,
  onAddClick,
  children,
  onMediaUpdate,
  id,
}: IProps & IContainerHandlerProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [activeDropzone, setActiveDropzone] = useState(false)
  const isVisible = enableHandle && isHovered

  const _onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      onDoubleClick(index, { x: event.clientX, y: event.clientY })
    },
    [onDoubleClick, index]
  )

  const _onClick = useCallback(() => {
    onClick(index)
  }, [onClick, index])

  const _onAddClick = useCallback(() => {
    onAddClick(index)
  }, [onAddClick, index])

  const _onDrop = async (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    const files = [...event.dataTransfer.files]
    let multipleFileIndex = index
    files.forEach(async (file) => {
      const fileReader = new FileReader()
      const blockType = fileTypeToBlockType(file.type)
      fileReader.onload = async (e) => {
        if (blockType === BlockType.IMAGE) {
          onMediaUpdate(
            multipleFileIndex,
            {
              value: fileReader.result?.toString() || null,
              sourceType: MediaSourceType.LOCAL,
              fileName: file.name,
              fileSize: file.size,
            },
            { file: file, blockType: BlockType.IMAGE, id: id },
            BlockType.IMAGE,
            true
          )
          multipleFileIndex = multipleFileIndex + 1
          setActiveDropzone(false)
        }
      }

      if (blockType === BlockType.IMAGE) {
        await fileReader.readAsDataURL(file)
      } else {
        onMediaUpdate(
          index,
          { value: file.name, sourceType: MediaSourceType.LOCAL, fileName: file.name, fileSize: file.size },
          { file: file, blockType: blockType, id: id },
          blockType,
          true
        )
      }
      await fileReader.readAsDataURL(file)
    })
  }

  const onDragOver = useCallback(
    (event: any) => {
      event.preventDefault()
      setActiveDropzone(true)
    },
    [setActiveDropzone]
  )

  const _setActiveDropzoneFalse = () => {
    setActiveDropzone(false)
  }

  return (
    <div ref={hoverRef}>
      <div
        onDragOver={onDragOver}
        onDragLeaveCapture={_setActiveDropzoneFalse}
        className={activeDropzone ? styles.dropzoneBlock : styles.block}
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
        onClick={_onClick}
        onDoubleClick={_onDoubleClick}
        onDrop={_onDrop}
      >
        <Controls initialHeight={initialHeight} visible={isVisible} onAddClick={_onAddClick} />
        {children}
      </div>
    </div>
  )
}

interface IProps {
  children: ReactNode
  index: number
  initialHeight: number
  enableHandle?: boolean
  id: number
}

export interface IContainerHandlerProps {
  onClick: (index: number) => void
  onDoubleClick: (index: number, pos: { x: number; y: number }) => void
  onAddClick: (index: number) => void
  onUpdate: (index: number, arg0: BlockData) => void
  onMediaUpdate: (
    index: number,
    arg0: BlockDataMedia,
    file: BlockDataMediaUpload,
    blockType: BlockType,
    createNew?: boolean
  ) => void
}

export default memo(Container)
