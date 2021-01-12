type KeyedItem = { [key: number]: number }

type Node = {
  parentId: number | null
  children: Node[]
}

// https://typeofnan.dev/an-easy-way-to-build-a-tree-with-object-references/
export function unflatten<T extends Node>(list: T[]) {
  let root: Node[] = []
  var tree = [...list]

  const idMapping: KeyedItem = tree.reduce((prevValue, el, i) => {
    // @ts-ignore
    prevValue[el.id] = i
    return prevValue
  }, {})

  tree.forEach((el) => {
    // Handle the root element
    if (el.parentId === null || el.parentId === undefined) {
      root.push(el)
      return
    }
    // Use our mapping to locate the parent element in our data array
    const newId = idMapping[el.parentId]
    const parentEl = tree[newId]

    // Add our current el to its parent's `children` array
    parentEl.children = [...(parentEl.children || []), el]
  })
  return root
}
