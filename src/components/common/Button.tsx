import { forwardRef, HTMLAttributes, RefObject } from 'react'
import styles from './Button.module.scss'

const Button = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...otherProps }, ref) => (
  <div className={styles.button} {...otherProps} ref={ref}>
    {children}
  </div>
))

export default Button
