async function parse(html: string) {
  const parse5 = await import('parse5')

  const documentFragment = parse5.parseFragment(html)
  return documentFragment
}

export default parse
