import styles from './PageControls.module.scss'

const Footer = ({ wordCount, lastEditedName, lastEditedAt }: IProps) => {
  return (
    <div className={styles.footer}>
      Word count: {wordCount}
      <br />
      Last edited by {lastEditedName}
      <br />
      Today at {lastEditedAt}
    </div>
  )
}

interface IProps {
  wordCount: number
  lastEditedName: string
  lastEditedAt: string
}

export default Footer
