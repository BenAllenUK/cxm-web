import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { ReactComponent as ArrowIcon } from '../../../images/icons/arrow-filled-right.svg'
import { ReactComponent as MenuIcon } from '../../../images/icons/menu.svg'
import { ReactComponent as SearchIcon } from '../../../images/icons/search.svg'
import { GetCampaignsQuery } from '../../../generated/graphql'
import Colors from '../../../config/Colors'

const GET_CAMPAIGNS = gql`
  query getCampaigns($organisationId: Int!) {
    organisations_by_pk(id: $organisationId) {
      id
      name
      image
      segments {
        id
        name
        segment_campaigns {
          campaign {
            id
            name
            description
          }
        }
      }
    }
  }
`

const Container = styled.div`
  width: 400px;
  height: 100vh;
  background-color: ${Colors.primary};
`
const Label = styled.div`
  font-size: 10px;
  color: #7c7c7c;
  padding-left: 20px;
  padding-top: 20px;
`

const Segment = styled.div`
  padding-top: 5px;
`

const SegmentItem = styled.a`
  display: flex;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.text2};

  :hover {
    background-color: #fbfcff;
    color: ${Colors.text2};
  }
`

const CampaignItemContainer = styled.a`
  padding-left: 30px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 10px;
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.text2};
  width: 100%;

  :hover {
    background-color: #fbfcff;
    color: ${Colors.text2};
  }

  svg path {
    fill: ${Colors.text2};
  }
`

const CampaignItemIcon = styled.img`
  margin-right: 10px;
`

const CampaignItem = ({ children }: { children: any }) => (
  <CampaignItemContainer>
    <ArrowIcon width={12} height={12} style={{ marginRight: 10 }} />
    <div>{children}</div>
  </CampaignItemContainer>
)

const NavigationItemContainer = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${Colors.text2};

  :hover {
    background-color: #fbfcff;
    color: ${Colors.text2};
  }
`

const IconContainer = styled.img`
  margin-right: 20px;
`

const EmptyLogoContainer = styled.div`
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

const OrganisationItem = ({ name, image }: { name: string; image: string | undefined | null }) => (
  <NavigationItemContainer style={{ marginTop: 60, marginBottom: 10 }}>
    {image ? (
      <IconContainer width={16} height={16} src={image} style={{ borderRadius: 5 }} />
    ) : (
      <EmptyLogoContainer>{name.substring(0, 1)}</EmptyLogoContainer>
    )}
    <span style={{ color: Colors.text1 }}>{name}</span>
  </NavigationItemContainer>
)

const Sidebar = () => {
  const organisationId = 1

  const { data, loading, error } = useQuery<GetCampaignsQuery>(GET_CAMPAIGNS, {
    variables: { organisationId },
  })

  if (!data || !data.organisations_by_pk) {
    return <Container />
  }

  if (error) {
    console.log(error)
    return <div>Error...</div>
  }

  return (
    <>
      <Container>
        <OrganisationItem
          image={data.organisations_by_pk.image}
          name={data.organisations_by_pk.name}
        />
        <NavigationItemContainer>
          <SearchIcon style={{ marginRight: 20 }} />
          <div>Quick Find</div>
        </NavigationItemContainer>
        <NavigationItemContainer>
          <MenuIcon style={{ marginRight: 20 }} />
          <div>Feed</div>
        </NavigationItemContainer>
        <Label>SEGMENTS</Label>
        {data.organisations_by_pk.segments.map((item) => (
          <Segment>
            <SegmentItem>{item.name}</SegmentItem>
            {item.segment_campaigns.map((subItem) => (
              <CampaignItem>{subItem.campaign.name}</CampaignItem>
            ))}
          </Segment>
        ))}
      </Container>
    </>
  )
}

export default Sidebar
