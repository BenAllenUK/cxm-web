import { forwardRef, HTMLProps, useRef } from 'react'
import useOnClickOnOutside from 'utils/hooks/useOnClickOnOutside'
import LinkButton from './LinkButton'
import Button from './Button'
import styles from './TextControlUncontrolled.module.scss'
import ChevronDownIcon from 'images/icons/chevron-down.svg'
import CommentIcon from 'images/icons/comment.svg'
import ExternalLinkIcon from 'images/icons/external-link.svg'
import CodeIcon from 'images/icons/code.svg'
import DotsIcon from 'images/icons/dots.svg'
import { useTranslation } from 'next-i18next'
import { insertSpanWithClassName } from 'components/editor/utils/html'
import mergeRefs from 'utils/refs/mergeRefs'

const TextControlsUncontrolled = forwardRef<HTMLDivElement, IProps>(
  (
    { onDismiss, onShowTextStyleModal, onShowLinkModal, onShowConversionModal, onShowCommentModal, onShowMoreModal, ...props },
    forwardedRef
  ) => {
    const ref = useRef<HTMLDivElement>(null)
    const { t } = useTranslation(['editor'])

    useOnClickOnOutside(ref, () => {
      onDismiss()
    })

    const _onCodeStyleClick = () => {
      insertSpanWithClassName('code')
    }

    return (
      <div {...props} ref={mergeRefs(ref, forwardedRef)} className={styles.container}>
        <Button onClick={onShowConversionModal} data-tip={t('textControls.buttonConversionTip')}>
          {t('textControls.buttonConversion')}
          <ChevronDownIcon className={styles.chevronDownIcon} />
        </Button>
        <Button onClick={onShowLinkModal} data-tip={t('textControls.buttonLinkTip')}>
          <ExternalLinkIcon className={styles.externalLinkIcon} />
          <span className={styles.underline}>{t('textControls.buttonLink')}</span>
          <ChevronDownIcon className={styles.chevronDownIcon} />
        </Button>
        <Button onClick={onShowCommentModal} data-tip={t('textControls.buttonCommentTip')}>
          <CommentIcon className={styles.commentIcon} />
          {t('textControls.buttonComment')}
        </Button>
        <Button command={'bold'} data-tip={t('textControls.buttonBoldTip')}>
          B
        </Button>
        <Button command={'italic'} data-tip={t('textControls.buttonItalicTip')}>
          <div className={styles.italicIcon}>i</div>
        </Button>
        <Button command={'underline'} data-tip={t('textControls.buttonUnderlineTip')}>
          <div className={styles.underlineIcon}>U</div>
        </Button>
        <Button command={'strikeThrough'} data-tip={t('textControls.buttonStrikeThroughTip')}>
          <div className={styles.strikeThroughIcon}>S</div>
        </Button>
        <Button onClick={_onCodeStyleClick} data-tip={t('textControls.buttonCodeTip')}>
          <CodeIcon className={styles.codeIcon} />
        </Button>
        <Button onClick={onShowTextStyleModal} data-tip={t('textControls.buttonTextStyleTip')}>
          <div className={styles.textStyleIcon}>A</div>
          <ChevronDownIcon className={styles.chevronDownIcon} />
        </Button>
        <Button onClick={onShowMoreModal} data-tip={t('textControls.buttonMoreTip')}>
          <DotsIcon className={styles.dotsIcon} />
        </Button>
      </div>
    )
  }
)

export default TextControlsUncontrolled

interface IProps extends HTMLProps<HTMLDivElement> {
  onDismiss: () => void
  onShowTextStyleModal: () => void
  onShowLinkModal: () => void
  onShowConversionModal: () => void
  onShowCommentModal: () => void
  onShowMoreModal: () => void
}
