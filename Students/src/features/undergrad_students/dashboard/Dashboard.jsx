import React from 'react'
import useAuth from '../../../hooks/useStudent'
function Dashboard() {
    const {data: student} = useAuth()
  return (
    <div>{`Welcome ${student.firstName} ${student.lastName}`}</div>
  )
}

export default Dashboard