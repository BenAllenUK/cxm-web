import styles from './SettingsControls.module.scss'
import { ISettingsButton, ISettingsSubSections } from '.'
import ButtonComponent from 'components/common/button/Button'

const Button = ({ element, onButtonClick }: IProps) => {
  return (
    <div>
      <div className={element.hint ? styles.butttonLabelWithHint : styles.label}>{element.label}</div>
      {element.hint && <div className={styles.hint}>{element.hint}</div>}
      <div>
        <ButtonComponent
          className={element.isImportant ? styles.importantButton : styles.button}
          onClick={element.children ? () => onButtonClick(element.children) : () => null}
        >
          {element.text}
        </ButtonComponent>
      </div>
    </div>
  )
}

export default Button

interface IProps {
  element: ISettingsButton
  onButtonClick: (options: ISettingsSubSections | undefined) => void
}
