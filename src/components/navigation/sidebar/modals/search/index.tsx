import createModal from 'components/common/modals/simple'

import SearchComponent, { ISearchProps } from './Search'

const { Provider, useModal } = createModal()

export const useSearchModal = useModal

const Component = (props: ISearchProps) => {
  const { enabled, hideControls } = useSearchModal()
  return <>{enabled && <SearchComponent {...props} onDismiss={hideControls} />}</>
}

const Search = { Provider, Component }

export default Search
