import ReactTooltip, { TooltipProps } from 'react-tooltip'

import tooltipStyles from 'components/tooltip/Tooltip.module.scss'

export function Tooltip({ id = 'root', ...props }: IProps) {
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
      {...props}
    />
  )
}

interface IProps extends TooltipProps {
  id?: string
}
