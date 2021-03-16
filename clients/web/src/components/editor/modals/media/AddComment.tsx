import { memo, useState } from 'react'
import styles from './AddComment.module.scss'
import TextInput from 'components/common/text-input/TextInput'
import Button from 'components/common/button/Button'

export const AddComment = ({ onClick }: IProps) => {
  const [comment, setComment] = useState('')

  const onChange = (e: any) => {
    setComment(e.target.value)
  }

  const _onClick = () => {
    onClick(comment)
  }
  return (
    <div className={styles.container}>
      <TextInput
        focusedPlaceholder={'Add a comment...'}
        blurredPlaceholder={'Add a comment...'}
        html={comment}
        onChange={onChange}
        className={styles.comment}
      />
      <Button onClick={_onClick} className={styles.button}>
        Send
      </Button>
    </div>
  )
}

interface IProps {
  onClick: (comment: string) => void
}

export default memo(AddComment)
