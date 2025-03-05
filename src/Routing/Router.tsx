import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './routes/Index'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Laroportal from './routes/Laroportal'
import AuthProvider from '../Auth/AuthProvider'

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Navbar/>
        <Routes >
            <Route index element={<Index/>}/>
            <Route path='laroportal' element={<Laroportal/>}/>
            <Route path="/laroportal/:id" element={<div>specific id</div>}/> 
            <Route path='*' element={<div>error 404</div>}/>
        </Routes>
        <Footer/>
      </AuthProvider>

    </BrowserRouter>

  )
}

export default Router