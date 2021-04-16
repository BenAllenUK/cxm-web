import styles from '../FileSelectionUncontrolled.module.scss'
import { Image, CloudinaryContext } from 'cloudinary-react'

const ImageGrid = ({ pictures, handleClick }: IProps) => {
  const CloudinaryImage = ({ picture }: any) => {
    const _handleClick = () => {
      handleClick(picture.public_id)
    }
    return (
      <div key={picture.public_id}>
        <Image onClick={_handleClick} className={styles.gridElement} publicId={picture.public_id} key={picture.public_id} />
      </div>
    )
  }

  return (
    <div>
      <CloudinaryContext cloudName={'dbiqces70'}>
        {pictures.map((picture: any) => {
          return <CloudinaryImage picture={picture} />
        })}
      </CloudinaryContext>
    </div>
  )
}

export default ImageGrid

interface IProps {
  pictures: any
  handleClick: (url: string) => void
}
