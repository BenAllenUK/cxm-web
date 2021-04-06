import { BlockDataMedia } from '../../../types'
import './Video.scss'
import ReactJWPlayer from 'react-jw-player'

export default function Video({ content, id }: IProps) {
  const { value } = content

  return (
    <div className={'omnea-content-video'}>
      <ReactJWPlayer
        playerId={`player-${id}`}
        playerScript='https://cdn.jwplayer.com/libraries/ogA7IZvl.js'
        file={value}
      />
    </div>
  )
}

interface IProps {
  id: number
  content: BlockDataMedia
}
