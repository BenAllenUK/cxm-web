import createPositionModal from 'components/common/modals/position'
import { insertSpanWithStyle } from 'components/editor/utils/html'
import TextStyleUncontrolled, { backgroundColorOptions, StyleSections, textColorOptions } from './TextStyleUncontrolled'

const { Provider, useModal } = createPositionModal()
export const useTextStyleModal = useModal

const Component = (props: IProps) => {
  const { enabled, position, hideControls } = useTextStyleModal()

  const _onClick = (sectionId: number, id: number) => {
    console.log(sectionId, id)
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
        <TextStyleUncontrolled
          style={{ left: position.x, top: position.y }}
          onDismiss={hideControls}
          onClick={_onClick}
          {...props}
        />
      )}
    </>
  )
}

const TextStyle = { Provider, Component }

export default TextStyle

interface IProps {}
