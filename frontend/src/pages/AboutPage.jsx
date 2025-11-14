import React from 'react'
import HeroSection from '../components/commoncomponents/HeroSection'
import Counts from '../components/commoncomponents/Counts'
import GetinTouch from '../components/commoncomponents/GetinTouch';
import People from '../components/aboutcomponents/people'
import Whoweare from '../components/commoncomponents/Whoweare';

// hello added 
import image from '../assets/images/herosectionimage.png'


function AboutPage() {
  return (
    <>
      <HeroSection 
      
        heading='ABOUT US'
        description='TARS Technologies is a team of passionate innovators dedicated to delivering simple and intelligent IT solutions. With expertise in web services, training, and development, we empower businesses to streamline processes, stay competitive, and embrace the future with confidence.'
        section='#nextsection'
      />
      <div  id='nextsection' className='pt-16 lg:pt-32 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p data-aos="fade-down" className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>OUR Vision & Mission</p>
        <p data-aos="fade-down" className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Epic Beginnings: Unveiling Our Essence,<br className='hidden md:block' /> Crafting Futures with Excellence.</p>
        <div data-aos="fade-right" className='flex flex-col md:flex-row gap-10 lg:gap-40 py-12 lg:py-25 px-5 lg:px-25'>
          <div className='w-[300px] md:w-[445px] text-left space-y-4 lg:space-y-14 ml-42'>
            <p className='text-[18px] lg:text-[28px]  '>Vision: Vision for Tomorrow.</p>
            <p className='text-[12px] lg:text-[20px] '>"To create intelligent, simple, and future-ready IT solutions that empower businesses and enrich lives."</p>
          </div>
          <div className='w-[300px] md:w-[445px] text-left space-y-4 lg:space-y-14 '>
            <p className='text-[18px] lg:text-[28px] '>Mission: Mission at Work</p>
            <p className='text-[12px] lg:text-[20px] '>"To understand client needs, deliver innovative web and IT services, and provide value-driven solutions that enable growth and success."</p>
          </div>
        </div>
      </div>

    
      <Whoweare />
      <Counts />

      <div className='pt-20 md:pt-14 lg:pt-30 text-center bg-gradient-to-t from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Founders</p>
        <p className='text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Your Aspiration, Our Expertise: Driven by<br /> Dreamers, Built by Doers.</p>
        <div className='flex flex-col md:flex-row justify-center gap-5 md:gap-30 lg:gap-50 py-15 lg:py-17'>
          <People picture={image} name='Sumedh Boudh' position='Founder' />
          <People picture={image} name='Shrutika Tirpude' position='Co-Founder' />
        </div>
        <p className='pt-8 lg:pt-14 text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Our Team</p>
        <p className='text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] mx-6'>Your Aspiration, Our Expertise: Brains<br className='hidden md:block' /> Behind the Breakthroughs.</p>
        <div className='flex flex-wrap justify-center  gap-x-6 md:gap-x-12 lg:gap-x-11 gap-y-8 md:gap-y-17 lg:gap-y-15 pt-18 pb-20 lg:pb-26 px-4 lg:px-40'>
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
          <People picture={image} name='Your Name' position='Position' />
        </div>
      </div>

      <GetinTouch />
    </>
  )
}

export default AboutPage
