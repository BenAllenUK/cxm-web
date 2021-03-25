import styles from './Uploading.module.scss'
import Progress from '../progress/Progress'

const Uploading = ({ content, id, alwaysDisplay, Icon }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div>
          <Icon height={30} width={20} />
        </div>
        <div className={styles.innerContainer}>
          {content}
          <Progress id={id} alwaysDisplay={alwaysDisplay} />
        </div>
      </div>
    </div>
  )
}

export default Uploading

interface IProps {
  content: string | null
  id: number
  alwaysDisplay?: boolean
  Icon: any
}
