import debounce from 'lodash/debounce'
import reverse from 'lodash/reverse'
import uniqBy from 'lodash/uniqBy'
import type { ValueIteratee } from 'lodash'

interface DebouncedMergedFunc<T extends unknown> {
  (args: T): void
}

const debounceMerged = <T extends unknown>(
  func: (_: Array<T>) => any,
  delay: number,
  property: ValueIteratee<T>
): DebouncedMergedFunc<T> => {
  let merged: T[] = []

  const debouncedFunc = debounce(() => {
    const final = uniqBy(reverse(merged), property)
    func(final)
    merged = []
  }, delay)

  return (item: T) => {
    merged.push(item)
    debouncedFunc()
  }
}

export default debounceMerged
