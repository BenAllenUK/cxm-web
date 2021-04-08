async function sanitize(html: string) {
  const xss = await import('xss')
  const filter = new xss.FilterXSS({
    onTag: (tag, a, options: any) => {
      // TODO: Probably breaking divs
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
      span: ['style', 'class'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
  })
  return filter.process(html)
}

export default sanitize
