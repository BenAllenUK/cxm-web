import React, { useEffect } from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import {
  GetEditorActivitySubscription,
  UpdateEditorActivityMutation,
} from '../../generated/graphql'
import ReactTooltip from 'react-tooltip'

const UPDATE_EDITOR_ACTIVITY = gql`
  mutation updateEditorActivity($segmentId: Int, $userId: Int, $now: timestamptz!) {
    update_editor_activities(
      where: { segment_id: { _eq: $segmentId }, user_id: { _eq: $userId } }
      _set: { created_at: $now }
    ) {
      affected_rows
    }
  }
`

const GET_EDITOR_ACTIVITY = gql`
  subscription getEditorActivity($segmentId: Int!) {
    editor_activities(where: { segment_id: { _eq: $segmentId } }) {
      created_at
      user {
        id
        name
        image
      }
    }
  }
`

type EditorItem = {
  created_at: string
  user: {
    id: number
    name: string
    image: string
  }
}

const EditorContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const EditorImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 25px;
  margin-left: 5px;
`

const EditorImageDisabled = styled(EditorImage)`
  opacity: 0.3;
`

const EditorActivity = () => {
  // TODO: Pass from global state
  // TODO: Restrict to only this current user and user has access to segment - hasura permissions
  const segmentId = 3
  const userId = 1

  const [updateEditorActivity] = useMutation<UpdateEditorActivityMutation>(UPDATE_EDITOR_ACTIVITY)
  const { data, loading, error } = useSubscription<GetEditorActivitySubscription>(
    GET_EDITOR_ACTIVITY,
    { variables: { segmentId } }
  )

  useEffect(() => {
    const onlineIndicator = setInterval(
      () =>
        updateEditorActivity({
          variables: { segmentId, userId, now: new Date().toISOString() },
        }),
      20000
    )
    return () => clearInterval(onlineIndicator)
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    console.log(error)
    return <div>Error...</div>
  }

  const onlineUsersList = data.editor_activities.map((editor: EditorItem, index: number) => (
    <div key={index}>
      {false ? (
        <EditorImage src={editor.user.image} />
      ) : (
        <EditorImageDisabled
          data-tip={editor.user.name}
          data-for="editor-activity-info"
          src={editor.user.image}
        />
      )}
    </div>
  ))
  return (
    <>
      <EditorContainer>{onlineUsersList}</EditorContainer>
      <ReactTooltip
        place="bottom"
        id="editor-activity-info"
        getContent={(dataTip) => dataTip}
        effect="solid"
      />
    </>
  )
}

export default EditorActivity
