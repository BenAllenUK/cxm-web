import { BlockDataMedia, MediaSourceType } from '../../../types'
import './Video.scss'
import ReactJWPlayer from 'react-jw-player'

export default function Video({ content, id }: IProps) {
  const fileUrl =
    content.sourceType === MediaSourceType.EMBED_LINK
      ? content.value
      : `${process.env.OMNEA_UPLOAD_URL}/${content.value}`

  return (
    <div className={'omnea-content-video'}>
      <ReactJWPlayer
        playerId={`player-${id}`}
        playerScript='https://cdn.jwplayer.com/libraries/ogA7IZvl.js'
        file={fileUrl}
      />
    </div>
  )
}

interface IProps {
  id: number
  content: BlockDataMedia
}
