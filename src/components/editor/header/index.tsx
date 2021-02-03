import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs'
import MUILink from '@material-ui/core/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/common/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import MoreIcon from 'images/icons/more.svg'
import styles from './Header.module.scss'
import { usePageControlModals } from '../page-controls'
import { useRef } from 'react'
import Colors from 'config/colors'

export const Header = ({}: IProps) => {
  const { showControls } = usePageControlModals()

  const ref = useRef<HTMLDivElement>(null)

  const _onPageControlsClick = (e: any) => {
    showControls(1, {
      x: ref.current?.offsetLeft || 0,
      y: (ref.current?.offsetTop || 0) + (ref.current?.offsetHeight || 0) + 10,
    })
  }
  return (
    <div>
      {false && <LinearProgress />}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.historyControls}>
            <Button className={styles.button}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
            <Button className={styles.button}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </div>
          <div className={styles.historyBreadcrumbs}>
            <MUIBreadcrumbs maxItems={4}>
              <MUILink>Foo</MUILink>
              <MUILink>Bar</MUILink>
              <MUILink>Bar</MUILink>
              <MUILink>Bar</MUILink>
              <MUILink>Bar</MUILink>
            </MUIBreadcrumbs>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Button style={{ alignSelf: 'center' }} className={styles.button}>
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

interface IProps {}

export default Header
