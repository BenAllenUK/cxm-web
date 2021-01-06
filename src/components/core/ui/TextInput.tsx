import * as React from 'react'
import styled from 'styled-components'
import Colors from 'config/colors'

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
export default class TextInput extends React.Component<Props, State> {
  lastHtml: string = this.props.html
  el?: HTMLDivElement

  state = {
    isFocused: false,
  }

  getEl = () => {
    return this.el
  }

  onFocus = (e: React.FocusEvent) => {
    this.setState({ isFocused: true })
    return this.emitChange(e)
  }

  onBlur = (e: React.FocusEvent) => {
    this.setState({ isFocused: false })
    return this.emitChange(e)
  }

  onKeyUp = (e: React.KeyboardEvent) => {
    return this.emitChange(e)
  }

  onKeyDown = (e: React.KeyboardEvent) => {
    return this.emitChange(e)
  }

  render() {
    const {
      focusedPlaceholder,
      blurredPlaceholder,
      html,
      innerRef: refCallback,
      disabled,
      ...props
    } = this.props
    const { isFocused } = this.state
    const focusedPlaceholderText = focusedPlaceholder || ''
    const blurredPlaceholderText = blurredPlaceholder || ''

    return (
      <DivText
        {...props}
        placeholder={isFocused ? focusedPlaceholderText : blurredPlaceholderText}
        ref={(ref) => {
          if (!refCallback || !ref) return
          this.el = ref
          refCallback(ref)
          return ref
        }}
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

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const { props, state } = this
    const el = this.getEl()

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
    const el = this.getEl()
    if (!el) return

    // Perhaps React (whose VDOM gets outdated because we often prevent
    // rerendering) did not update the DOM. So we update it manually now.
    if (this.props.html !== el.innerHTML) {
      el.innerHTML = this.props.html
    }
    this.lastHtml = this.props.html
    replaceCaret(el)
  }

  emitChange = (originalEvt: React.SyntheticEvent<any>) => {
    const el = this.getEl()
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

const DivText = styled.div`
  color: ${Colors.primaryText};
  font-size: 16px;
  font-family: 'SF Pro Display';
  overflow: auto;
  background: none;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  outline: none;
  resize: none;

  &:empty:before {
    content: attr(placeholder);
  }
  &[placeholder]:empty:before {
    color: ${Colors.controls};
  }
`

export type TextInputEvent = React.SyntheticEvent<any, Event> & { target: { value: string } }
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R
type DivProps = Modify<JSX.IntrinsicElements['div'], { onChange: (event: TextInputEvent) => void }>

export interface Props extends DivProps {
  focusedPlaceholder?: string
  blurredPlaceholder?: string
  innerRef?: (ref: HTMLDivElement | null) => void
  html: string
  disabled?: boolean
  className?: string
  style?: Object
  tabIndex?: number
}

export interface State {
  isFocused: boolean
}
