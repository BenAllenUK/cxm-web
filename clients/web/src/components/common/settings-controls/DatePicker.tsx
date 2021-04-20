import styles from './SettingsControls.module.scss'
import { ISettingsDate } from '.'
import { TextField } from '@material-ui/core'
import { useState, ChangeEvent } from 'react'

const DatePicker = ({ element }: IProps) => {
  const [date, setDate] = useState(element.date)
  const _onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDate(e.target.value)
  }

  const _onUpdate = () => {
    element.onUpdate(date)
  }
  return (
    <div>
      <TextField
        id="datetime-local"
        label={element.label}
        type="datetime-local"
        defaultValue={date}
        onChange={_onChange}
        className={styles.datePicker}
        onBlur={_onUpdate}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  )
}

export default DatePicker

interface IProps {
  element: ISettingsDate
}
