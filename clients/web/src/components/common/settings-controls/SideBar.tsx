import styles from './SettingsControls.module.scss'
import { useCallback } from 'react'
import { ISettingsSections, ISettingsSubSections } from './index'

const SideBar = ({ sections, onClick }: IProps) => {
  const SubSection = ({ subSection }: ISubSection) => {
    const _onClick = useCallback(() => {
      onClick(subSection.id)
    }, [onClick, subSection.id])

    return (
      <div className={styles.subSection} onClick={_onClick}>
        {subSection.icon}
        {subSection.title}
      </div>
    )
  }

  const Section = ({ section }: ISection) => {
    return (
      <div>
        <div className={styles.sectionTitle}>{section.title}</div>
        {section.children.map((subSection) => (
          <SubSection subSection={subSection} key={subSection.id} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.sideBarContainer}>
      {sections.map((section) => (
        <Section section={section} key={section.id} />
      ))}
    </div>
  )
}

export default SideBar

interface IProps {
  sections: ISettingsSections[]
  onClick: (id: number) => void
}

interface ISection {
  section: ISettingsSections
}

interface ISubSection {
  subSection: ISettingsSubSections
}
