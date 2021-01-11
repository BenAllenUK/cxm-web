export async function sanitizeHtml(html: string) {
  const xss = await import('xss')
  const filter = new xss.FilterXSS({
    onTag: (tag, _, options: any) => {
      const isClosing = options['isClosing']
      if (tag === 'div' && isClosing) {
        return '<br />'
      }
    },
    whiteList: {
      br: [],
      p: [],
      b: [],
      i: [],
      a: ['href', 'title', 'target'],
      h1: [],
      h2: [],
      h3: [],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
  })
  return filter.process(html)
}
