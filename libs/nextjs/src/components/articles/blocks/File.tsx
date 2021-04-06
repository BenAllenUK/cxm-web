import './File.module.scss'
import AttachmentIcon from '../../../images/paperclip.svg'
import { BlockDataMedia } from '../../../types'
import { readableBytes } from '../../../utils/readableBytes'

const File = ({ content }: IProps) => {
  console.log('should be rendering file', content)
  return (
    <div
      className={'omnea-content-attachment-container'}
      onClick={() => open(`${process.env.OMNEA_UPLOAD_URL}/${content.value}`)}
    >
      <div className={'omnea-content-icon'}>
        <AttachmentIcon />
      </div>
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
