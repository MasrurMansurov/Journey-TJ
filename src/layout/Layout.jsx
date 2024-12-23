import React from 'react'
import Header from '../components/shared/header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/shared/footer/Footer'
import Container from "../components/container/Container"

const Layout = () => {
  return (
    <>
    <Container>
      <Header/>
    </Container>
      <Outlet/>
    <Container>
      <Footer/>
    </Container>
  
    </>
  )
}

export default Layout