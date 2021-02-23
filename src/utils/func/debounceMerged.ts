import { debounce, List, reverse, uniqBy, ValueIteratee } from 'lodash'

interface DebouncedMergedFunc<T extends unknown> {
  (args: T): void
}

const debounceMerged = <T extends unknown>(
  func: (_: List<T>) => any,
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
