import useTranslation from 'utils/translations/useTranslation'
import { createContext, ReactNode, useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from 'react-transition-group'

import styles from './ErrorModal.module.scss'
import useTimeout from 'utils/hooks/useTimeout'

export enum MessageType {
  INTERNET_ERROR = 'INTERNET_ERROR',
  DEFAULT = 'DEFAULT',
}

export enum DisplayType {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}

const displayStyles = {
  [DisplayType.ERROR]: styles.containerError,
  [DisplayType.WARNING]: styles.containerWarning,
  [DisplayType.INFO]: styles.containerWarning,
}

interface IError {
  enabled: boolean
  message: string | null
  messageType: MessageType | null
  displayType: DisplayType | null
}

interface ContextActions extends IError {
  showError: (type: MessageType) => void
  showErrorMsg: (message: string) => void
  showWarning: (type: MessageType) => void
  showWarningMsg: (message: string) => void
  clearError: () => void
}

const initialState = {
  enabled: false,
  message: null,
  messageType: null,
  displayType: null,
  showError: (type: MessageType) => {},
  showErrorMsg: (message: string) => {},
  showWarning: (type: MessageType) => {},
  showWarningMsg: (message: string) => {},
  clearError: () => {},
}

const Context = createContext<ContextActions>(initialState)

export const useErrorModal = () => useContext(Context)

const Provider = ({ children }: IProps) => {
  const [state, setState] = useState<IError>(initialState)

  const showWarning = (messageType: MessageType) => {
    setState({
      ...initialState,
      enabled: true,
      messageType,
      displayType: DisplayType.WARNING,
    })
  }

  const showWarningMsg = (message: string) => {
    setState({
      ...initialState,
      enabled: true,
      message,
      displayType: DisplayType.WARNING,
    })
  }

  const showError = (messageType: MessageType) => {
    setState({
      ...initialState,
      enabled: true,
      messageType,
      displayType: DisplayType.ERROR,
    })
  }

  const showErrorMsg = (message: string) => {
    setState({
      ...initialState,
      enabled: true,
      message,
      displayType: DisplayType.ERROR,
    })
  }

  const clearError = () => {
    setState((state) => ({ ...state, enabled: false }))
  }

  return (
    <Context.Provider value={{ ...state, showWarning, showWarningMsg, showError, showErrorMsg, clearError }}>
      {children}
    </Context.Provider>
  )
}

const Component = () => {
  const { enabled, ...otherHandlers } = useErrorModal()

  return (
    <>
      <CSSTransition
        in={enabled}
        timeout={200}
        classNames={{
          enter: styles.messageEnter,
          enterActive: styles.messageEnterActive,
          exit: styles.messageExit,
          exitActive: styles.messageExitActive,
        }}
        unmountOnExit
      >
        <MessageComponent {...otherHandlers} />
      </CSSTransition>
    </>
  )
}

const MessageComponent = ({ message, messageType, displayType, clearError }: IMessageProps) => {
  const { t } = useTranslation(['common'])

  useTimeout(() => {
    clearError()
  }, 5000)

  return (
    <div className={displayStyles[displayType || DisplayType.ERROR]}>
      <FontAwesomeIcon className={styles.icon} icon={faExclamationCircle} />
      <div>{message || t(`errors.${messageType || MessageType.DEFAULT}`)}</div>
    </div>
  )
}

interface IMessageProps {
  message: string | null
  messageType: MessageType | null
  displayType: DisplayType | null
  clearError: () => void
}

interface IProps {
  children: ReactNode
}

export default { Provider, Component }
