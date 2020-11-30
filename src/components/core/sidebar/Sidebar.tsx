import React, { useState, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ReactComponent as MenuIcon } from 'images/icons/menu.svg'
import { ReactComponent as SearchIcon } from 'images/icons/search.svg'
import { GetCampaignsQuery } from 'generated/graphql'
import {
  Menu,
  ProjectItem,
  NavigationItemContainer,
  Label,
  Segment,
  SegmentItem,
  CampaignItem,
} from './SidebarControls'
import { WorkflowContext } from '../../workflow/Workflow'
import ReactTooltip from 'react-tooltip'

const GET_CAMPAIGNS = gql`
  query getCampaigns($projectId: Int!) {
    projects_by_pk(id: $projectId) {
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

// Create segment
// Create campaign

// Delete segment
//

const CREATE_SEGMENT = gql`
  query getCampaigns($projectId: Int!) {
    projects_by_pk(id: $projectId) {
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

interface ISegmentVisibility {
  [key: number]: boolean
}

const Sidebar = () => {
  const projectId = 1

  let { setSegment } = useContext(WorkflowContext)
  const { data, error } = useQuery<GetCampaignsQuery>(GET_CAMPAIGNS, {
    variables: { projectId },
  })

  const [openSegments, setOpenSegments] = useState<ISegmentVisibility>({})

  if (!data || !data.projects_by_pk) {
    return <Menu />
  }

  if (error) {
    console.log(error)
    return <div>Error...</div>
  }

  const toggleSegmentVisibility = (id: number) => {
    setOpenSegments({ ...openSegments, [id]: !openSegments[id] })
    setSegment(id)
  }

  return (
    <>
      <Menu>
        <ProjectItem image={data.projects_by_pk.image} name={data.projects_by_pk.name} />
        <NavigationItemContainer>
          <SearchIcon style={{ marginRight: 20 }} />
          <div>Quick Find</div>
        </NavigationItemContainer>
        <NavigationItemContainer>
          <MenuIcon style={{ marginRight: 20 }} />
          <div>Feed</div>
        </NavigationItemContainer>
        <Label>SEGMENTS</Label>
        {data.projects_by_pk.segments.map((item, index) => {
          const isOpen = openSegments[item.id]
          return (
            <Segment key={index}>
              <SegmentItem isOpen={isOpen} onClick={(_) => toggleSegmentVisibility(item.id)}>
                {item.name}
              </SegmentItem>
              {isOpen && (
                <div>
                  {item.segment_campaigns.map((subItem, subIndex) => (
                    <CampaignItem isOpen={false} key={subIndex}>
                      {subItem.campaign.name}
                    </CampaignItem>
                  ))}
                </div>
              )}
            </Segment>
          )
        })}
      </Menu>
      <ReactTooltip place="bottom" id="sidebar" getContent={(dataTip) => dataTip} effect="solid" />
    </>
  )
}

export default Sidebar
