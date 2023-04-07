import React from 'react'
import { Navigate } from 'react-router-dom'

export function RedirectToAdminDash() {
  return (
    <Navigate to='dashboard' />
  )
}

export function RedirectToAdminStudents() {
    return (
      <Navigate to='undergraduates' />
    )
  }


