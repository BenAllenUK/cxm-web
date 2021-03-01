import * as React from 'react'
import sanitize from 'utils/html/sanitize'
import styles from './TextInput.module.scss'
import mergeRefs from 'utils/refs/mergeRefs'

function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ')
}

function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('')
  el.appendChild(target)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection()
    if (sel !== null) {
      var range = document.createRange()
      range.setStart(target, target.nodeValue.length)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
    if (el instanceof HTMLElement) el.focus()
  }
}

/**
 * A simple component for an html element with editable contents.
 */
class TextInput extends React.Component<ITextInputProps, State> {
  lastHtml: string = this.props.html

  state = {
    isFocused: false,
  }

  ref = React.createRef<HTMLDivElement>()

  onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const { onFocus } = this.props
    onFocus && onFocus(e)
    this.emitChange(e)

    this.setState({ isFocused: true })
  }

  onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const { onBlur } = this.props
    onBlur && onBlur(e)
    this.emitChange(e)

    this.setState({ isFocused: false })
  }

  onKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { onKeyUp } = this.props
    onKeyUp && onKeyUp(e)

    this.emitChange(e)
  }

  onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { onKeyDown } = this.props
    onKeyDown && onKeyDown(e)
    this.emitChange(e)
  }

  onPaste = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain')
    const safeHtml = await sanitize(html)
    document.execCommand('insertHTML', false, safeHtml)
  }

  componentDidMount() {}

  render() {
    const { focusedPlaceholder, blurredPlaceholder, html, innerRef, disabled, ...props } = this.props
    const { isFocused } = this.state
    const focusedPlaceholderText = focusedPlaceholder
    const blurredPlaceholderText = blurredPlaceholder

    return (
      <div
        className={styles.textInputContainer}
        {...props}
        placeholder={isFocused ? focusedPlaceholderText : blurredPlaceholderText}
        ref={mergeRefs(this.ref, innerRef)}
        onPaste={this.onPaste}
        onInput={this.emitChange}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onKeyUp={this.onKeyUp}
        onKeyDown={this.onKeyDown}
        contentEditable={!disabled}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  shouldComponentUpdate(nextProps: ITextInputProps, nextState: State): boolean {
    const { props, state } = this
    const el = this.ref?.current

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!el) return true

    // ...or if html really changed... (programmatically, not by user edit)
    if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
      return true
    }

    if (nextState.isFocused !== state.isFocused) {
      return true
    }

    // if (nextProps.blurredPlaceholder !== props.blurredPlaceholder) {
    //   return true
    // }

    // if (nextProps.focusedPlaceholder !== props.focusedPlaceholder) {
    //   return true
    // }

    // Handle additional properties
    return props.disabled !== nextProps.disabled || props.className !== nextProps.className
  }

  componentDidUpdate() {
    if (!this.ref?.current) return

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (this.props.html !== this.ref.current.innerHTML) {
      this.ref.current.innerHTML = this.props.html
    }
    this.lastHtml = this.props.html
    replaceCaret(this.ref.current)
  }

  emitChange = (originalEvt: React.SyntheticEvent<any>) => {
    const el = this.ref?.current
    if (!el) return

    const html = el.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid
      // "Cannot assign to read only property 'target' of object"
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html,
        },
      })
      this.props.onChange(evt)
    }
    this.lastHtml = html
  }
}

export type TextInputEvent = React.SyntheticEvent<any, Event> & { target: { value: string } }
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
type DivProps = Modify<JSX.IntrinsicElements['div'], { onChange: (event: TextInputEvent) => void }>

export interface IBaseProps extends DivProps {
  focusedPlaceholder?: string
  blurredPlaceholder?: string
  html: string
  disabled?: boolean
  className?: string
  style?: Object
  tabIndex?: number
}

interface ITextInputProps extends IBaseProps {
  innerRef: React.ForwardedRef<HTMLDivElement>
}

export interface State {
  isFocused: boolean
}

export default React.forwardRef<HTMLDivElement, any>((props, ref) => <TextInput innerRef={ref} {...props} />)
