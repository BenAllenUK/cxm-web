import styles from './SettingsControls.module.scss'
import { ISettingsSwitch } from '.'
import MUISwitch from '@material-ui/core/Switch'

const Switch = ({ element }: IProps) => {
  return (
    <div className={styles.switchField}>
      <div>
        <div className={element.hint ? styles.labelWithHint : styles.label}>{element.label}</div>
        {element.hint && <div className={styles.hint}>{element.hint}</div>}
      </div>
      <MUISwitch className={styles.switch} checked={element.state} size="medium" color="secondary" />
    </div>
  )
}

export default Switch

interface IProps {
  element: ISettingsSwitch
}
