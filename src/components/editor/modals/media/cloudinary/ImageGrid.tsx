import styles from '../MediaSelector.module.scss'
import { Image, CloudinaryContext } from 'cloudinary-react'

const ImageGrid = ({ pictures, handleClick }: IProps) => {
  return (
    <div>
      <CloudinaryContext cloudName={'dbiqces70'}>
        {pictures.map((picture: any) => (
          <Image
            onClick={() => handleClick(picture.public_id)}
            className={styles.gridElement}
            publicId={picture.public_id}
            key={picture.public_id}
          />
        ))}
      </CloudinaryContext>
    </div>
  )
}

export default ImageGrid

interface IProps {
  pictures: any
  handleClick: (url: string) => void
}
