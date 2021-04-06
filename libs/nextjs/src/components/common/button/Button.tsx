import { forwardRef, HTMLAttributes, RefObject } from 'react'
import './Button.scss'

const Button = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, ...otherProps }, ref) => (
    <div className={'omnea-button-base '} {...otherProps} ref={ref}>
      {children}
    </div>
  )
)

export default Button
