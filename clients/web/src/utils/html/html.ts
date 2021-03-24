import { CSSProperties } from 'react'

export const insertHTML = () => {}

export const insertSpanWithStyle = (style: CSSProperties) => {
  const styleString = Object.entries(style)
    .map(([k, v]) => `${k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)}:${v}`)
    .join(';')
  document.execCommand('insertHTML', false, `<span style='${styleString}'>` + document.getSelection() + '</span>')
}

export const insertSpanWithClassName = (className: string) => {
  document.execCommand('insertHTML', false, `<span class='${className}'>` + document.getSelection() + '</span>')
}
