import { BlockDataText, BlockType } from '../../../types'
import './Text.scss'

export default function Text({ content, type }: IProps) {
  const { value } = content
  switch (type) {
    case BlockType.H1:
      return (
        <div className={'omnea-content-text'}>
          <h1 dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.H2:
      return (
        <div className={'omnea-content-text'}>
          <h2 dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.H3:
      return (
        <div className={'omnea-content-text'}>
          <h3 dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.H4:
      return (
        <div className={'omnea-content-text'}>
          <h4 dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.H5:
      return (
        <div className={'omnea-content-text'}>
          <h5 dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.TEXT:
      return (
        <div
          className={'omnea-content-text'}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )
    case BlockType.CODE:
      return (
        <div className={'omnea-content-code'}>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.CALLOUT:
      return (
        <div className={'omnea-content-callout'}>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    case BlockType.QUOTE:
      return (
        <div className={'omnea-content-quote'}>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )
    default:
      return <div />
  }
}

interface IProps {
  type: BlockType
  content: BlockDataText
}
