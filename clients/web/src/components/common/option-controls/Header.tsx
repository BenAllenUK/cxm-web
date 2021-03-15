import styles from './OptionControls.module.scss'

export const Header = ({ title }: IProps) => {
  return <div className={styles.header}>{title}</div>
}

interface IProps {
  title: string
}

export default Header
