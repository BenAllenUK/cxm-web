import { useCallback, useEffect, useState } from 'react'

const useCopyToClipboard = (text: string) => {
  const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea')
    const selection = document.getSelection()

    if (!selection) {
      return false
    }

    el.value = str
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)
    const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false
    el.select()
    const success = document.execCommand('copy')
    document.body.removeChild(el)
    if (selected) {
      selection.removeAllRanges()
      selection.addRange(selected)
    }
    return success
  }

  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    if (!copied) setCopied(copyToClipboard(text))
  }, [text])
  useEffect(() => () => setCopied(false), [text])

  return [copied, copy]
}

export default useCopyToClipboard
