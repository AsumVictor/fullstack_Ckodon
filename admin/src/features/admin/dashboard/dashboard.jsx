import React from 'react'
import Page from '../../../components/shared/page'
import useAuth from '../../../hooks/useAuth'
import useTitle from '../../../hooks/useTitle'

function Dashboard() {
  const {firstName, lastName} = useAuth()
  useTitle(`Admin Dashboard`)

  return (
    <Page>
        <h2>{`Welcome ${firstName} ${lastName} `}</h2>
    </Page>
  )
}

export default Dashboard