import Colors from 'config/colors'
import { forwardRef } from 'react'
import ProjectIcon from 'components/common/project-icon/ProjectIcon'
import styles from './Sidebar.module.scss'

const Title = forwardRef<HTMLDivElement, IProps>(({ name, image, onClick }, forwardedRef) => {
  return (
    <div ref={forwardedRef} className={styles.title} onClick={onClick}>
      <ProjectIcon image={image} name={name} />
      <span style={{ marginLeft: 12, color: Colors.text1 }}>{name}</span>
    </div>
  )
})

export default Title

interface IProps {
  name: string
  image?: string | null
  onClick: () => void
}
