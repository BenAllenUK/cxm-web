import type { Element } from 'parse5'

export const insertLinkPlaceholder = () => {
  document.execCommand('insertHTML', false, `<span class='link-placeholder'>` + document.getSelection() + '</span>')
}

export const applyLinkToPlaceholder = async (value: string, link: string) => {
  const parse5 = await import('parse5')
  const htmlFragment = parse5.parseFragment(value)

  const newNodes = htmlFragment.childNodes.map((item) => {
    if (item.hasOwnProperty('attrs')) {
      const element = item as Element
      const [placeholderElement] = element.attrs.filter((item) => item.value === 'link-placeholder' && item.name === 'class')

      const isPlaceholder = !!placeholderElement
      if (isPlaceholder) {
        return {
          ...element,
          nodeName: 'a',
          tagName: 'a',
          attrs: [{ name: 'href', value: link }],
        }
      }

      return element
    }
    return item
  })

  return parse5.serialize({
    ...htmlFragment,
    childNodes: newNodes,
  })
}

export const removeLinkPlaceholders = async (value: string) => {
  const parse5 = await import('parse5')

  const htmlFragment = parse5.parseFragment(value)
  const newNodes = htmlFragment.childNodes.map((item) => {
    if (item.hasOwnProperty('attrs')) {
      const element = item as Element
      const [placeholderElement] = element.attrs.filter((item) => item.value === 'link-placeholder' && item.name === 'class')

      const isPlaceholder = !!placeholderElement
      if (isPlaceholder) {
        return element.childNodes[0]
      }

      return element
    }
    return item
  })

  return parse5.serialize({
    ...htmlFragment,
    childNodes: newNodes,
  })
}
