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
         <div className="flex w-full bg-emerald-100 py-2 rounded-md border-2 border-emerald-600 px-2">
         <h2 className='text-3xl text-black font-bold'>{`Welcome back,`} <span className='text-MdBlue'>{admin.firstName}!</span> </h2> 

         </div>
         <h2>Waiting  for content and design of the page</h2>
    </Page>
  )
}

export default Dashboard