import Colors from 'config/colors'
import styles from './Sidebar.module.scss'

export default function Title({ name, image }: IProps) {
  return (
    <div className={styles.title}>
      {image ? (
        <img width={16} height={16} src={image} style={{ marginRight: 20, borderRadius: 5 }} />
      ) : (
        <div className={styles.titleEmptyLogo}>{name.substring(0, 1)}</div>
      )}
      <span style={{ color: Colors.text1 }}>{name}</span>
    </div>
  )
}

interface IProps {
  name: string
  image?: string | null
}
