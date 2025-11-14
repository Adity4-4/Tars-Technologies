import React from 'react'
import HeroSection from '../components/commoncomponents/HeroSection'
import Services from '../components/commoncomponents/Services'
import Counts from '../components/commoncomponents/Counts'
import Clients from '../components/commoncomponents/Clients'
import GetinTouch from '../components/commoncomponents/GetinTouch'

function ServicesPage() {
  return (
    <>
      <HeroSection
        heading='SERVICES'
        description='At Tars Technology, we believe that that innovation is the key to unlocking new possibilities. our team of visionary thinkers and skilled technologist are dedicated to developing your Dreams. '
        section='#nextsection'
      />
      <div id='nextsection'>
        <Services />
      </div>
      <Counts />
      <Clients />
      <GetinTouch />
    </>
  )
}

export default ServicesPage
