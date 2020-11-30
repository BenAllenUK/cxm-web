import React, { useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { GetUserActivitySubscription, UpdateUserActivityMutation } from 'generated/graphql'
import ReactTooltip from 'react-tooltip'
import { UserContext } from 'components/App'
import { WorkflowContext } from 'components/workflow/Workflow'
import { subMinutes } from 'date-fns'

const UPDATE_EDITOR_ACTIVITY = gql`
  mutation updateUserActivity($segmentId: Int!, $userId: Int!, $now: timestamptz!) {
    insert_user_activities_one(
      object: { segment_id: $segmentId, user_id: $userId, created_at: $now }
      on_conflict: { constraint: user_activities_pkey, update_columns: [created_at] }
    ) {
      user_id
      segment_id
    }
  }
`

const GET_EDITOR_ACTIVITY = gql`
  subscription getUserActivity($segmentId: Int!) {
    user_activities(where: { segment_id: { _eq: $segmentId } }, order_by: { user_id: asc }) {
      created_at
      user {
        id
        name
        image
      }
    }
  }
`

type IActivityItem = {
  created_at: string
  user: {
    id: number
    name: string
    image: string
  }
}

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px;
`

const UserImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 25px;
  margin-left: 5px;
`

const UserImageDisabled = styled(UserImage)`
  opacity: 0.3;
`

const UserActivity = () => {
  // TODO: Pass from global state
  // TODO: Restrict to only this current user and user has access to segment - hasura permissions
  const { id: userId } = useContext(UserContext)
  const { segmentId } = useContext(WorkflowContext)

  const [updateUserActivity] = useMutation<UpdateUserActivityMutation>(UPDATE_EDITOR_ACTIVITY)
  const { data, loading, error } = useSubscription<GetUserActivitySubscription>(
    GET_EDITOR_ACTIVITY,
    { variables: { segmentId } }
  )

  useEffect(() => {
    const onlineIndicator = setInterval(() => {
      if (!segmentId || !userId) {
        return
      }

      console.log(`Logging activity for: ${segmentId} and ${userId}`)

      updateUserActivity({
        variables: { segmentId, userId, now: new Date() },
      })
    }, 10000)
    return () => clearInterval(onlineIndicator)
  })

  if (loading || !data) {
    return null
  }
  if (error || !data) {
    console.log(error)
    return <div>Error...</div>
  }

  const onlineUsersList = data.user_activities.map((activity: IActivityItem, index: number) => {
    const now = new Date(activity.created_at)
    const isActive = now.getTime() > subMinutes(new Date(), 1).getTime()
    const isRecentlyActive = now.getTime() > subMinutes(new Date(), 30).getTime()
    return (
      <div key={index} data-tip={activity.user.name} data-for="user-activity-info">
        {isActive && <UserImage src={activity.user.image} />}
        {isRecentlyActive && !isActive && <UserImageDisabled src={activity.user.image} />}
      </div>
    )
  })
  return (
    <>
      <UserContainer>{onlineUsersList}</UserContainer>
      <ReactTooltip
        place="bottom"
        id="user-activity-info"
        getContent={(dataTip) => dataTip}
        effect="solid"
      />
    </>
  )
}

export default UserActivity
