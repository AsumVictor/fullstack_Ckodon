import React from 'react'
import Page from '../../../components/shared/page'
import useAuth from '../../../hooks/useAuth'

function Dashboard() {

   const {firstName, lastName} = useAuth()

  return (
    <Page>
        <h2>{`Welcome ${firstName} ${lastName} `}</h2>
    </Page>
  )
}

export default Dashboard