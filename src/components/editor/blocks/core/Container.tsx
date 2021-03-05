import { useCallback, useState, memo, ReactNode } from 'react'
import useHover from 'utils/hooks/useHover'
import { BlockData, BlockType } from 'components/editor/blocks/types'
import { BLOCK_CONTAINER_VERTICAL_PADDING } from '..'
import { useAsset } from 'components/providers/assets'
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

  const _onDrop = useCallback(
    async (event: any) => {
      event.stopPropagation()
      event.preventDefault()
      let files = [...event.dataTransfer.files]
      let fileReader = new FileReader()
      fileReader.onload = async function (e) {
        var image = fileReader.result
        onUpdate(
          index,
          {
            localValue: image,
            uploadFile: true,
            file: files[0],
            type: 'image/png',
          },
          BlockType.IMAGE,
          true
        )
        setActiveDropzone(false)
      }
      await fileReader.readAsDataURL(files[0])
    },
    [onUpdate, index]
  )

  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const [activeDropzone, setActiveDropzone] = useState(false)
  const isVisible = enableHandle && isHovered

  const onDragOver = (active: boolean, event: any) => {
    event.preventDefault()
    setActiveDropzone(active)
  }

  return (
    <div ref={hoverRef}>
      <div
        onDragOver={(e) => onDragOver(true, e)}
        onDragLeaveCapture={() => setActiveDropzone(false)}
        className={activeDropzone ? styles.dropzoneBlock : styles.block}
        style={{
          marginTop: BLOCK_CONTAINER_VERTICAL_PADDING,
          marginBottom: BLOCK_CONTAINER_VERTICAL_PADDING,
        }}
        onClick={_onClick}
        onDoubleClick={_onDoubleClick}
        onDrop={(e) => _onDrop(e)}
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
  onUpdate: (index: number, arg0: BlockData, type?: BlockType, createNew?: boolean) => void
}

export default memo(Container)
