import ReactTooltip from 'react-tooltip'

import tooltipStyles from 'components/tooltip/Tooltip.module.scss'

export function Tooltip({ id = 'root' }: IProps) {
  return (
    <ReactTooltip
      html={false}
      delayShow={300}
      offset={{ top: -10 }}
      className={tooltipStyles.tooltip}
      id={id}
      place="bottom"
      getContent={(dataTip: any) => dataTip}
      effect="solid"
    />
  )
}

interface IProps {
  id?: string
}
