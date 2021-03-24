import createPositionModal from 'components/common/modals/position'
import { insertSpanWithStyle } from 'utils/html/html'
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'
import TextStyleUncontrolled, { backgroundColorOptions, StyleSections, textColorOptions } from './TextStyleUncontrolled'

const { Provider: ModalProvider, useModal } = createPositionModal()
export const useTextStyleModal = useModal

interface FocusedBlockContext {
  blockId: number | null
}

interface FocusedBlockActions extends FocusedBlockContext {
  setPlaceholderBlockId: (id: number | null) => void
}

const FocusedBlockContext = createContext<FocusedBlockActions>({
  blockId: null,
  setPlaceholderBlockId: () => {},
})

export const useFocusedBlock = () => useContext(FocusedBlockContext)

const Component = (props: IProps) => {
  const { rootRef, enabled, position, hideControls } = useTextStyleModal()

  const _onClick = (sectionId: number, id: number) => {
    if (sectionId === StyleSections.textColor) {
      const [textColorOption] = textColorOptions.filter((item) => item.id === id)
      insertSpanWithStyle({ color: textColorOption.color })
    } else if (sectionId === StyleSections.backgroundColor) {
      const [backgroundColorOption] = backgroundColorOptions.filter((item) => item.id === id)
      insertSpanWithStyle({ backgroundColor: backgroundColorOption.color })
    }
  }

  return (
    <>
      {enabled && position && (
        <TextStyleUncontrolled rootRef={rootRef} position={position} onDismiss={hideControls} onClick={_onClick} {...props} />
      )}
    </>
  )
}

const Provider = ({ children, ...otherProps }: any) => {
  const [blockId, setPlaceholderBlockId] = useState<number | null>(null)

  const _setPlaceholderBlockId = (id: number | null) => {
    setPlaceholderBlockId(id)
  }

  return (
    <FocusedBlockContext.Provider value={{ setPlaceholderBlockId: _setPlaceholderBlockId, blockId }}>
      <ModalProvider {...otherProps}>{children}</ModalProvider>
    </FocusedBlockContext.Provider>
  )
}

const TextStyle = { Provider, Component }

export default TextStyle

interface IProps {}
