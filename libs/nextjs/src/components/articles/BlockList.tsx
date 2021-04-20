import { Block } from '../../types'

import './BlockList.scss'

import BlockItem from './BlockItem'

const BlockList = ({ blocks }: IProps) => {
  console.log('blocks', blocks)
  return (
    <div className={'omnea-content-block-list'}>
      {blocks.map((item, i) => (
        <div key={i} className={'omnea-content-block-item'}>
          <BlockItem item={item} index={i} />
        </div>
      ))}
    </div>
  )
}

interface IProps {
  blocks: Block[]
}

export default BlockList
