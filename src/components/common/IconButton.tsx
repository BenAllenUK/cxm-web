import React from 'react'
import styles from './IconButton.module.scss'

const IconButton = ({ children, ...otherProps }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.container} {...otherProps}>
    {children}
  </div>
)

export default IconButton
