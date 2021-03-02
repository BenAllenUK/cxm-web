import styles from '../MediaSelector.module.scss'
import { Image, CloudinaryContext } from 'cloudinary-react'

const ImageGrid = ({ pictures }: IProps) => {
  return (
    <div>
      <CloudinaryContext cloudName={'dbiqces70'}>
        {pictures.map((picture: any) => (
          <Image className={styles.gridElement} publicId={picture.public_id} />
        ))}
      </CloudinaryContext>
    </div>
  )
}

export default ImageGrid

interface IProps {
  pictures: any
}
