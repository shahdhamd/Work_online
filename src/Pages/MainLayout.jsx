import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


function MainLayout({loginData,logout,services}) {
  return (
<>
      <Navbar   loginData={loginData} logout={logout} services={services}/>
      <Outlet />
      <Footer />
    </>
      )
}

export default MainLayout