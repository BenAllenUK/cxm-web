import React, { useState } from 'react'
import Header from './header/Header'
import styled from 'styled-components'
import Sidebar from 'components/core/sidebar/Sidebar'

interface IWorkflowData {
  segmentId: number | null
  campaignId: number | null
}
interface IWorkflowContext extends IWorkflowData {
  setSegment: (segmentId: number) => void
  setCampaign: (campaignId: number) => void
}

const Container = styled.div`
  position: relative;
  width: 100%;
`

const GridBackground = styled.div`
  width: 100%;
  height: 100%;
`

export const WorkflowContext = React.createContext<IWorkflowContext>({
  segmentId: null,
  campaignId: null,
  setSegment: (_) => {},
  setCampaign: (_) => {},
})

const Workflow = () => {
  const [workflow, setWorkflow] = useState<IWorkflowData>({ segmentId: null, campaignId: null })

  const setSegment = (segmentId: number) => {
    setWorkflow({ ...workflow, segmentId })
  }

  const setCampaign = (campaignId: number) => {
    setWorkflow({ ...workflow, campaignId })
  }

  return (
    <WorkflowContext.Provider value={{ ...workflow, setSegment, setCampaign }}>
      <Sidebar />
      <Container>
        <Header />
        <GridBackground></GridBackground>
      </Container>
    </WorkflowContext.Provider>
  )
}

export default Workflow
