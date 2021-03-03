import UploadExample from 'components/samples/UploadExample'
import AssetsProvider from 'components/providers/assets'
import Root from 'components/root'

const AssetsUploader = ({}: IProps) => {
  return (
    <Root>
      <AssetsProvider>
        <UploadExample />
      </AssetsProvider>
    </Root>
  )
}

const Samples = ({}: IProps) => {
  return <AssetsUploader />
}

export default Samples

interface IProps {}
