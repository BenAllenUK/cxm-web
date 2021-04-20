import './File.module.scss'
import { BlockDataMedia } from '../../../types'
import { readableBytes } from '../../../utils/readableBytes'

const File = ({ content }: IProps) => {
  return (
    <div
      className={'omnea-content-attachment-container'}
      onClick={() => open(`${process.env.OMNEA_UPLOAD_URL}/${content.value}`)}
    >
      <div style={{ marginLeft: 10 }}>{content.fileName}</div>
      <div className={'omnea-content-file-size'}>
        {content.fileSize && readableBytes(content.fileSize)}
      </div>
    </div>
  )
}

export default File

interface IProps {
  content: BlockDataMedia
}
