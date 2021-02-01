import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs'
import MUILink from '@material-ui/core/Link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import IconButton from 'components/common/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

import styles from './Header.module.scss'

export const Header = ({}: IProps) => {
  return (
    <div>
      {false && <LinearProgress />}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.historyControls}>
            <IconButton className={styles.historyControlsButton}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
            <IconButton className={styles.historyControlsButton}>
              <FontAwesomeIcon icon={faArrowRight} />
            </IconButton>
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
          <IconButton className={styles.miscControlsButton}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

interface IProps {}

export default Header
