import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const Layout = ({children} : {children: React.ReactNode}) => {
  return (
    <section className='flex flex-col min-h-screen'>
        <Navbar/>

        {children}

        <Footer/>
    </section>
  )
}

export default Layout