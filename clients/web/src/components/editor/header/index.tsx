import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import LinearProgress from '@material-ui/core/LinearProgress'
import MoreIcon from 'images/icons/more.svg'
import styles from './Header.module.scss'
import { usePageControlModal } from '../modals/page-controls'
import { useRef, MouseEvent } from 'react'
import { Article } from 'operations/articles/types'
import Breadcrumbs from 'components/common/breadcrumbs'
import { BreadcrumbItem } from 'components/common/breadcrumbs/types'
import Button from 'components/common/button/Button'

export const Header = ({ loading, breadcrumbs, onViewArticle }: IProps) => {
  const { showControls } = usePageControlModal()

  const ref = useRef<HTMLDivElement>(null)

  const _onPageControlsClick = (e: MouseEvent) => {
    showControls({
      x: ref.current?.offsetLeft || 0,
      y: (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) + 10,
    })
  }

  const _onPublishClick = () => {}

  const _onNavigateClick = () => {}

  const _onBackClick = () => {}

  const _onForwardClick = () => {}

  return (
    <div>
      {loading ? <LinearProgress /> : <div style={{ height: 4 }}></div>}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.historyControls}>
            <div className={styles.historyControlsContainer}>
              <Button className={styles.button} onClick={_onBackClick}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </Button>
              <Button className={styles.button}>
                <FontAwesomeIcon icon={faArrowRight} onClick={_onForwardClick} />
              </Button>
            </div>
          </div>
          {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} onViewArticle={onViewArticle} maxItems={2} />}
        </div>
        <div className={styles.headerRight}>
          <Button onClick={_onPublishClick} style={{ alignSelf: 'center' }} className={styles.button}>
            Publish
          </Button>

          <Button ref={ref} style={{ alignSelf: 'center', padding: 2 }} onClick={_onPageControlsClick} className={styles.button}>
            <MoreIcon width={22} height={22} />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface IProps {
  loading?: boolean
  breadcrumbs: BreadcrumbItem[]
  onViewArticle: (path: string) => void
}

export default Header
