import { memo, useCallback, useEffect, useRef, useState } from 'react'

import { BlockType } from '../../types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faClone, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faLink, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'
import OptionControls, { IOptionElements, IOptionHeader, OptionType } from 'components/common/option-controls'
import { BlockTypeProperties } from '../blocks'
import Image from 'next/image'

import styles from './BlockControls.module.scss'

const BlockControls = ({ position, filterText, onClick, onDismiss }: IProps) => {
  const items: IOptionElements[] = Object.values(BlockTypeProperties).map((item, i) => ({
    id: item.id,
    icon: <Image className={styles.image} width={46} height={46} src={item.image} />,
    title: item.title,
    subtitle: item.subtitle,
    type: OptionType.Button,
  }))

  return (
    <OptionControls
      sections={[{ items: items, title: 'Basic Blocks' }]}
      position={position}
      iconClassName={styles.icon}
      onClick={onClick}
      onDismiss={onDismiss}
    />
  )
}

interface IProps {
  position: { x: number; y: number }
  filterText?: string | null
  onClick: (key: number) => void
  onDismiss: () => void
}

export default BlockControls
