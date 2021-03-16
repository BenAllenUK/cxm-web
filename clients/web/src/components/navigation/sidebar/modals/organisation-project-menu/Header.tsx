import styles from './Header.module.scss'
import Button from 'components/common/button/Button'
import MoreIcon from 'images/icons/more.svg'

const Header = ({ text, onClick }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.email}>{text}</div>
      <div>
        <Button onClick={onClick}>
          <MoreIcon width={14} height={14} />
        </Button>
      </div>
    </div>
  )
}

export default Header

interface IProps {
  text: string
  onClick: () => void
}
