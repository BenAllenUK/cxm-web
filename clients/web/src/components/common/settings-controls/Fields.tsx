import styles from './SettingsControls.module.scss'
import { IInnerSection, ISettingsElements, OptionType, ISettingsSubSections } from './index'
import DatePicker from './DatePicker'
import Switch from './Switch'
import TextInput from './TextInput'
import Button from './Button'

const Fields = ({ fields, onButtonClick }: IProps) => {
  const renderElementType = (element: ISettingsElements) => {
    switch (element.type) {
      case OptionType.TextInput:
        return <TextInput element={element} />
      case OptionType.Date:
        return <DatePicker element={element} />
      case OptionType.Switch:
        return <Switch element={element} />
      case OptionType.Button:
        return <Button element={element} onButtonClick={onButtonClick} />
    }
  }

  const FieldElement = ({ element }: IFieldElementProps) => {
    return <div className={styles.fieldElement}>{renderElementType(element)}</div>
  }

  const Section = ({ field }: ISectionProps) => {
    return (
      <div className={styles.innerSectionTitle}>
        {field.label}
        {field.showTitleLine && (
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
          </div>
        )}
        {field.children.map((element) => (
          <FieldElement element={element} key={element.id} />
        ))}
      </div>
    )
  }
  return (
    <div className={styles.fieldsContainer}>
      {fields.map((field) => (
        <Section key={field.id} field={field} />
      ))}
    </div>
  )
}

export default Fields

interface ISectionProps {
  field: IInnerSection
}

interface IFieldElementProps {
  element: ISettingsElements
}

interface IProps {
  fields: IInnerSection[]
  onButtonClick: (options: ISettingsSubSections | undefined) => void
}
