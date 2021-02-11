import Colors from 'config/colors'
import styles from './Sidebar.module.scss'
import PlusIcon from 'images/icons/plus.svg'

const AddButton = ({ onClick }: IProps) => {
  return (
    <div className={styles.item} onClick={onClick}>
      <div className={styles.itemMain}>
        <div
          className={styles.itemAddButtonIcon}
          style={{ marginRight: 4 }}
          data-tip={'Quickly add a page inside'}
          data-for="sidebar"
        >
          <PlusIcon fill={Colors.text2} width={12} height={12} />
        </div>
        <div className={styles.itemMainText}>Add a page</div>
      </div>
    </div>
  )
}

export default AddButton

interface IProps {
  onClick: () => void
}
