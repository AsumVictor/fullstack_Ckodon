import React from 'react'
import useAuth from '../../../hooks/useAuth'
function Dashboard() {
    const student = useAuth()
  return (
    <div>{`Welcome ${student.firstName} ${student.lastName}`}</div>
  )
}

export default Dashboard