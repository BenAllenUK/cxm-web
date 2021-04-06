import { BlockDataText, BlockType } from '../../../types'
import './Text.scss'

export default function Text({ content, type }: IProps) {
  const { value } = content
  switch (type) {
    case BlockType.H1:
      return (
        <h1
          className={'omnea-content-text'}
          dangerouslySetInnerHTML={{ __html: value }}
        ></h1>
      )
    case BlockType.H2:
      return (
        <h2
          className={'omnea-content-text'}
          dangerouslySetInnerHTML={{ __html: value }}
        ></h2>
      )
    case BlockType.H3:
      return (
        <h3
          className={'omnea-content-text'}
          dangerouslySetInnerHTML={{ __html: value }}
        ></h3>
      )
    case BlockType.TEXT:
      return (
        <p
          className={'omnea-content-text'}
          dangerouslySetInnerHTML={{ __html: value }}
        ></p>
      )
    case BlockType.CODE:
      return (
        <div className={'omnea-content-code'}>
          <div dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
      )
    case BlockType.CALLOUT:
      return (
        <div className={'omnea-content-callout'}>
          <div dangerouslySetInnerHTML={{ __html: value }}></div>
        </div>
      )
    case BlockType.QUOTE:
      return (
        <div className={'omnea-content-quote'}>
          <div dangerouslySetInnerHTML={{ __html: value }}></div>
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
