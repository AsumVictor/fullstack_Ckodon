import React from 'react'
import useAuth from '../../../hooks/useStudent'
import Page from '../../../../../admin/src/components/shared/page'
function Dashboard() {
    const {data: student} = useAuth()
  return (
    <Page>
    <div className="flex w-full bg-emerald-100 py-2 rounded-md border-2 border-emerald-600 px-2">
    <h2 className='text-3xl text-black font-bold'>{`Welcome back,`} <span className='text-MdBlue'>{student.firstName}!</span> </h2> 
    </div>
    <h2>Waiting  for content and design of the page</h2>
</Page>
  )
}

export default Dashboard