import Content from './Content'
import styles from './Editor.module.scss'

export default function Editor({ blocks }: any) {
  return (
    <>
      <div className={styles.container}>
        <Content blocks={blocks} />
      </div>
    </>
  )
}
