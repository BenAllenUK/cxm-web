import styles from './EditorPageSkelton.module.scss'

const EditorPageSkelton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}></div>
      <div className={styles.sidebar}></div>
      <div className={styles.editor}></div>
    </div>
  )
}

export default EditorPageSkelton
