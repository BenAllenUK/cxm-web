import styles from './Navbar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faEnvelope, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faUsers, faHome, faDatabase, faChartLine, faCogs } from '@fortawesome/free-solid-svg-icons'

import { Tooltip } from 'components/tooltip'

const controls = [
  {
    id: 0,
    icon: <FontAwesomeIcon className={styles.icon} icon={faHome} />,
    tip: 'Dashboard',
  },
  {
    id: 1,
    icon: <FontAwesomeIcon className={styles.icon} icon={faFile} />,
    tip: 'Content Marketing',
    selected: true,
  },
  {
    id: 3,
    icon: <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />,
    tip: 'Email Marketing',
  },
  {
    id: 4,
    icon: <FontAwesomeIcon className={styles.icon} icon={faThumbsUp} />,
    tip: 'Social Marketing',
  },
  {
    id: 5,
    icon: <FontAwesomeIcon className={styles.icon} icon={faChartLine} />,
    tip: 'Insights',
  },
  {
    type: 'LINE',
  },
  {
    id: 6,
    icon: <FontAwesomeIcon className={styles.icon} icon={faDatabase} />,
    tip: 'Customer Database',
  },
  {
    id: 7,
    icon: <FontAwesomeIcon className={styles.icon} icon={faCogs} />,
    tip: 'Settings',
  },
]

const Navbar = ({}: IProps) => {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {controls.map((item, i) => {
            if (item.type === 'LINE') {
              return <li className={styles.line} />
            }

            return (
              <li
                key={item.id}
                onClick={() => console.log(item.id)}
                className={item.selected ? styles.buttonSelected : styles.button}
                data-tip={item.tip}
                data-for={'navbar'}
              >
                {item.icon}
              </li>
            )
          })}
        </ul>
        <Tooltip id={'navbar'} offset={{ top: 0, left: -10 }} />
      </div>
    </>
  )
}

export default Navbar

interface IProps {}
