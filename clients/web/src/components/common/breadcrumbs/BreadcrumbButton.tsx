import Button from 'components/common/button/Button'

const BreadcrumbButton = ({ onClick, title, position }: IProps) => {
  const _onClick = () => {
    onClick(position)
  }
  return <Button onClick={_onClick}>{title}</Button>
}

interface IProps {
  onClick: (pos: number) => void
  title: string
  position: number
}

export default BreadcrumbButton
