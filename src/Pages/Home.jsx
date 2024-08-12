import React from 'react'
import Hero from '../components/Hero/Hero'
import Services from '../components/Services/Services'
import HowWork from '../components/HowWork/HowWork'
import Numbers from '../components/Numbers/Numbers'
import RegisterNow from './../components/RegisterNow/RegisterNow';
import Whymysite from '../components/Whymysite/Whymysite'

function Home() {
  let token = localStorage.getItem('token')
  return (
    <>
      


      <Hero />
      <HowWork />
      {
        token ? <Numbers />
          :
          <>    <RegisterNow />  

          </>
      }
      <Services />
      <Whymysite />
    </>
  )
}

export default Home