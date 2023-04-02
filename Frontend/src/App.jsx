import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './features/admin/layouts/shareLayout'

function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<SharedLayout />} />
     </Routes>
    </BrowserRouter>
      
   
  )
}

export default App
