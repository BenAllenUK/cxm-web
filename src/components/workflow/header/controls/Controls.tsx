import React, { useEffect } from 'react'
import { ReactComponent as MoreIcon } from '../../../../images/icons/more.svg'
import { ReactComponent as ShareIcon } from '../../../../images/icons/share.svg'
import { ReactComponent as HistoryIcon } from '../../../../images/icons/history.svg'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import Colors from '../../../../config/Colors'

const ButtonContainer = styled.a`
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  margin-left: 2px;
  margin-right: 2px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.text2};
  height: 34px;

  :hover {
    background-color: ${Colors.primary};
    color: ${Colors.text2};
  }

  svg path {
    fill: ${Colors.text2};
  }
`

const ShareButton = () => (
  <ButtonContainer data-tip={'Share or publish to the web'} data-for="controls-info-bottom">
    <ShareIcon width={14} height={14} style={{ marginRight: 10 }} />
    Share
  </ButtonContainer>
)

const VersionsButton = () => (
  <ButtonContainer data-tip={'View versions of this document'} data-for="controls-info-bottom">
    <HistoryIcon width={14} height={14} style={{ marginRight: 10 }} />
    History
  </ButtonContainer>
)

const MoreButton = () => (
  <ButtonContainer data-tip={'Profile, export and more..'} data-for="controls-info-left">
    <MoreIcon />
  </ButtonContainer>
)

const Controls = () => {
  return (
    <>
      <ShareButton />
      <VersionsButton />
      <MoreButton />
      <ReactTooltip
        place="bottom"
        id="controls-info-bottom"
        getContent={(dataTip) => dataTip}
        effect="solid"
      />
      <ReactTooltip
        place="left"
        id="controls-info-left"
        getContent={(dataTip) => dataTip}
        effect="solid"
      />
    </>
  )
}

export default Controls
