import styles from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={styles.container}>
      <img width={20} src={'./images/loading.gif'} alt="Loading" />
    </div>
  )
}

export default Loading
