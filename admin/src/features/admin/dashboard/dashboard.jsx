import React from 'react'
import Page from '../../../components/shared/page'
import useAuth from '../../../hooks/useAdmin'
import useTitle from '../../../hooks/useTitle'
import {CoverLoaderMedium} from '../../../components/loaders/loader'

function Dashboard() {
  const {data: admin, isLoading, isSuccess, isError, error} = useAuth()
  useTitle(`Admin Dashboard`)
 if(isLoading){
  return (
    <CoverLoaderMedium />
  )
 }

  return (
    <Page>
         <h2>{`Welcome ${admin.firstName} ${admin.lastName} `}</h2> 
    </Page>
  )
}

export default Dashboard