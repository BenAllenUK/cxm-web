import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow-filled-right.svg'
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg'
import { ReactComponent as MoreIcon } from '../../../images/icons/more.svg'
import Colors, { hexToRGB } from '../../../config/colors'

export const Menu = styled.div`
  width: 400px;
  height: 100vh;
  background-color: ${Colors.primary};
`
export const Label = styled.div`
  font-size: 10px;
  color: #7c7c7c;
  padding-left: 20px;
  padding-top: 20px;
`

export const Segment = styled.div`
  padding-top: 5px;
`

export const SegmentItemContainer = styled.div`
  display: flex;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${Colors.text2};
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: ${Colors.primaryHighlight};
    color: ${Colors.text2};
  }
`

export const CampaignControlContainer = styled.a`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: ${hexToRGB(Colors.text2, 0.2)};
    color: ${Colors.background};
  }
`

export const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ControlContainerHoverable = styled(ControlContainer)`
  a {
    visibility: hidden;
  }

  :hover a {
    visibility: visible;
  }
`

export const ShowMoreArrow = ({ isDown }: { isDown: boolean }) => (
  <CampaignControlContainer style={{ marginRight: 4 }}>
    <ArrowIcon
      width={10}
      height={10}
      style={isDown ? { transform: 'rotate(90deg)' } : {}}
      fill={hexToRGB(Colors.text2, 0.7)}
    />
  </CampaignControlContainer>
)

export const SegmentItem = ({
  children,
  onClick,
  isOpen,
}: {
  children: any
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  isOpen: boolean
}) => (
  <SegmentItemContainer onClick={onClick}>
    <ControlContainer>
      <ShowMoreArrow isDown={isOpen} />
      <div>{children}</div>
    </ControlContainer>
    <ControlContainerHoverable>
      <CampaignMoreButton />
      <CampaignAddButton />
    </ControlContainerHoverable>
  </SegmentItemContainer>
)

export const CampaignAddButton = () => (
  <>
    <CampaignControlContainer data-tip={'Quickly add a page inside'} data-for="sidebar">
      <PlusIcon fill={Colors.text2} width={12} height={12} />
    </CampaignControlContainer>
  </>
)

export const CampaignMoreButton = () => (
  <CampaignControlContainer data-tip={'Delete, duplicate and more...'} data-for="sidebar">
    <MoreIcon fill={Colors.text2} width={20} height={20} />
  </CampaignControlContainer>
)

export const CampaignItemContainer = styled.div`
  padding-left: 36px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 500;
  color: ${Colors.text2};
  user-select: none;
  pointer: cursor;

  :hover {
    background-color: #fbfcff;
    color: ${Colors.text2};
  }
`

export const CampaignItem = ({ children, isOpen }: { children: any; isOpen: boolean }) => (
  <CampaignItemContainer>
    <ControlContainer>
      <ShowMoreArrow isDown={isOpen} />
      <div>{children}</div>
    </ControlContainer>
    <ControlContainerHoverable>
      <CampaignMoreButton />
      <CampaignAddButton />
    </ControlContainerHoverable>
  </CampaignItemContainer>
)

export const NavigationItemContainer = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 15px;
  font-weight: 500;
  color: ${Colors.text2};
  user-select: none;

  :hover {
    background-color: #fbfcff;
    color: ${Colors.text2};
  }
`

export const IconContainer = styled.img`
  margin-right: 20px;
`

export const EmptyLogoContainer = styled.div`
  margin-right: 12px;
  background-color: ${Colors.text1};
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.primary};
  font-weight: 600;
  text-align: center;
  width: 22px;
  height: 22px;
  border-radius: 5px;
`

export const ProjectItem = ({
  name,
  image,
}: {
  name: string
  image: string | undefined | null
}) => (
  <NavigationItemContainer
    style={{ marginTop: 20, marginBottom: 10, paddingTop: 10, paddingBottom: 10 }}
  >
    {image ? (
      <IconContainer width={16} height={16} src={image} style={{ borderRadius: 5 }} />
    ) : (
      <EmptyLogoContainer>{name.substring(0, 1)}</EmptyLogoContainer>
    )}
    <span style={{ color: Colors.text1 }}>{name}</span>
  </NavigationItemContainer>
)
