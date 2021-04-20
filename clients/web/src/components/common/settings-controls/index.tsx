import { useCallback, useRef, useState, ReactNode, HTMLProps, forwardRef } from 'react'
import styles from './SettingsControls.module.scss'
import findIndex from 'lodash/findIndex'
import flatten from 'lodash/flatten'
import SideBar from './SideBar'
import Fields from './Fields'
import mergeRefs from 'utils/refs/mergeRefs'
import useOnDismiss from 'utils/hooks/useOnDismiss'
import Breadcrumbs from 'components/common/breadcrumbs'
import { BreadcrumbItem } from 'components/common/breadcrumbs/types'
import { Article } from 'operations/articles/types'

export enum OptionType {
  Button = 1,
  Line,
  Switch,
  TextInput,
  Date,
  Header,
}

export interface IOptionHeader {
  type: OptionType.Header
  title: string
}

export interface ISettingsButton {
  id: number
  type: OptionType.Button
  label?: string
  text: string
  children?: ISettingsSubSections
  icon?: ReactNode
  hint?: string
  isImportant?: boolean
  iconSize?: 'large' | 'normal'
  onClick?: () => void
}

export interface ISettingsSwitch {
  id: number
  label: string
  state: boolean
  type: OptionType.Switch
  hint?: string
  onUpdate: (value: boolean) => void
}

export interface ISettingsDate {
  id: number
  label: string
  date: string
  type: OptionType.Date
  onUpdate: (value: string) => void
}

export interface ISettingsTextInput {
  id: number
  value: string
  label: string
  placeholder: string
  type: OptionType.TextInput
  disabled?: boolean
  isSnakeCase?: boolean
  hint?: string
  onUpdate: (value: string) => void
}

export type ISettingsElements = ISettingsTextInput | ISettingsButton | ISettingsSwitch | ISettingsDate

export type IInnerSection = {
  id: number
  label: string
  showTitleLine: boolean
  children: ISettingsElements[]
}

export type ISettingsSubSections = {
  id: number
  title?: string
  children?: IInnerSection[]
  icon?: ReactNode
}

export type ISettingsSections = {
  id: number
  title?: string
  children: ISettingsSubSections[]
  showLine?: boolean
}

const SettingsControls = forwardRef<HTMLDivElement, IProps>(
  (
    {
      article,
      sections,
      header,
      footer,
      iconClassName,
      onUpsertArticles,
      onArticleUpdatePath,
      onItemClick,
      onDismiss,
      ...otherProps
    },
    forwardedRef
  ) => {
    const [selectedIndex, setSelected] = useState<number>(0)
    const actionItems = flatten(sections.map((section) => section.children.map((item) => ({ ...item, sectionId: section.id }))))
    const [focusedOptions, setFocusedOptions] = useState<IInnerSection[] | undefined>(actionItems[selectedIndex].children)
    const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([
      { link: actionItems[selectedIndex].id.toString(), title: actionItems[selectedIndex].title || '' },
    ])

    const _onItemMouseEnter = useCallback(
      (id: number) => {
        const index = findIndex(actionItems, (item) => item.id === id)
        setSelected(index)
        setFocusedOptions(actionItems[index].children)
      },
      [actionItems]
    )

    const findSelectedOption = (id: number, section: ISettingsSubSections) => {
      if (section.id === id) {
        return section
      } else if (section.children) {
        section.children.forEach((child) => {
          child.children.forEach((grandchild) => {
            if (grandchild.type === OptionType.Button && grandchild.children) {
              findSelectedOption(id, grandchild.children)
            }
          })
        })
      }
    }

    const _onNestedButtonClick = useCallback(
      (options: ISettingsSubSections | undefined) => {
        if (!options) {
          return
        }
        setFocusedOptions(options.children)
        const newBreadcrumb = breadcrumb
        newBreadcrumb.push({ link: options.id.toString(), title: options.title || '' })
        setBreadcrumb(newBreadcrumb)
      },
      [setFocusedOptions, breadcrumb, setBreadcrumb]
    )

    const _onBreadcrumbClick = useCallback(
      (id: string) => {
        const newBreadcrumb = breadcrumb
        setBreadcrumb(newBreadcrumb.slice(0, findIndex(newBreadcrumb, (item) => item.link === id) + 1))
        setFocusedOptions(findSelectedOption(parseInt(id), actionItems[selectedIndex])?.children)
      },
      [setBreadcrumb, setFocusedOptions, findSelectedOption, breadcrumb, actionItems]
    )

    const ref = useRef<HTMLDivElement>(null)

    useOnDismiss(ref, () => {
      onDismiss()
    })

    return (
      <div className={styles.defaultContainer} {...otherProps} ref={mergeRefs(forwardedRef, ref)}>
        <SideBar sections={sections} onClick={_onItemMouseEnter} />
        <div className={styles.innerContainer}>
          <Breadcrumbs
            breadcrumbs={breadcrumb}
            onViewArticle={_onBreadcrumbClick}
            separator={<div className={styles.separator}>/</div>}
            maxItems={2}
            isModal={true}
          />
          <Fields fields={focusedOptions || []} onButtonClick={_onNestedButtonClick} />
        </div>
      </div>
    )
  }
)

export default SettingsControls

interface IProps extends HTMLProps<HTMLDivElement> {
  article: Article
  sections: ISettingsSections[]
  header?: ReactNode
  footer?: ReactNode
  iconClassName?: string
  onItemClick: (sectionId: number, id: number) => void
  onArticleUpdatePath: (renameValue: string) => void
  onUpsertArticles: (value: Article) => void
  onDismiss: () => void
}
