import { useCallback, useState, memo, ReactNode } from 'react'
import useHover from 'utils/hooks/useHover'
import { BlockData, BlockType, MediaSourceType } from 'components/editor/blocks/types'
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
  onUpdate,
}: IProps & IContainerHandlerProps) => {
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [activeDropzone, setActiveDropzone] = useState(false)
  const [multipleFileIndex, setMultipleFileIndex] = useState(index)
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
    let files = [...event.dataTransfer.files]

    files.forEach(async (file) => {
      let fileReader = new FileReader()

      fileReader.onload = async (e) => {
        onUpdate(
          multipleFileIndex,
          {
            value: fileReader.result,
            type: MediaSourceType.LOCAL,
          },
          BlockType.IMAGE,
          files[0],
          true
        )
        setActiveDropzone(false)
        setMultipleFileIndex(multipleFileIndex + 1)
      }
      await fileReader.readAsDataURL(file)
    })
    setMultipleFileIndex(index)
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
}

export interface IContainerHandlerProps {
  onClick: (index: number) => void
  onDoubleClick: (index: number, pos: { x: number; y: number }) => void
  onAddClick: (index: number) => void
  onUpdate: (index: number, arg0: BlockData, type?: BlockType, file?: File, createNew?: boolean) => void
}

export default memo(Container)
