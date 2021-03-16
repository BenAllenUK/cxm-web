import OptionControls, { OptionType, IOptionSections } from 'components/common/option-controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import createPositionModal from 'components/common/modals/position'
import { Organisation } from 'operations/organisations/types'
import Header from './Header'
import Footer from './Footer'
import styles from './OrganisationProjectMenu.module.scss'
import ProjectIcon from 'components/common/project-icon/ProjectIcon'
import { useTranslation } from 'next-i18next'
import Routes, { Subdomain } from 'navigation/routes'
import { useRouter } from 'next/router'
import { useNavigation } from 'components/navigation/provider'

export enum PageControlOptions {
  Delete = 0,
  Duplicate,
  Copy,
  Rename,
}

const { Provider, useModal } = createPositionModal()

export const useOrganisationProjectMenuModal = useModal

const Component = ({ organisations = [], email, onClick }: IComponentProps) => {
  const { navigate, push } = useNavigation()
  const { enabled, position, hideControls } = useOrganisationProjectMenuModal()
  const _onClick = (sectionId: number, id: number) => {
    const [organisation] = organisations.filter((item) => item.id == sectionId)
    const [project] = (organisation.projects || []).filter((item) => item.id == id)

    if (!organisation || !project) {
      console.error(`Project not found`)
      return
    }

    onClick(organisation.slug, project.slug)
    hideControls()
  }

  const _onMoreClick = () => {}

  const _onLogoutClick = () => {
    navigate(Subdomain.Root, Routes.root.logout)
  }
  const _onGetAppClick = () => {
    navigate(Subdomain.Root, Routes.root.getApp)
  }

  const { t } = useTranslation(['common'])

  const sections: IOptionSections[] = organisations.map((organisation) => ({
    id: organisation.id,
    showLine: true,
    items: (organisation.projects || []).map((project) => ({
      id: project.id,
      icon: <ProjectIcon width={30} height={30} image={project.image} name={project.name} />,
      type: OptionType.Button,
      title: project.name,
      subtitle: t('modals.projectSelection.subtitle', {
        organisationName: organisation.name,
        membersCount: organisation.stats?.aggregate?.count,
      }),
    })),
  }))

  return (
    <>
      {enabled && position && (
        <OptionControls
          className={styles.container}
          header={<Header onClick={_onMoreClick} text={email || ''} />}
          footer={<Footer onLogoutClick={_onLogoutClick} onGetAppClick={_onGetAppClick} />}
          sections={sections}
          style={{ left: position.x, top: position.y }}
          onItemClick={_onClick}
          onDismiss={hideControls}
        />
      )}
    </>
  )
}

export default {
  Component,
  Provider,
}

interface IComponentProps {
  email?: string | null
  organisations: Organisation[]
  onClick: (orgSlug: string, projSlug: string) => void
}
