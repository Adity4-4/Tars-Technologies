import React from 'react'
import tarslogo from '../assets/icons/tarslogo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <div className='text-[#FFFFFF99] text-[10px] md:text-[14px] lg:text-[16px] bg-black '>
        <div className='flex flex-col-reverse md:flex-row justify-center items-center md:items-start gap-10 lg:gap-45 py-15 lg:py-24'>
          <div className='flex flex-col md:flex-row justify-center gap-8 lg:gap-35'>
            <div className='text-center md:text-left space-y-3 lg:space-y-6'>
              <p className='text-white font-[500] text-[14px] md:text-[17px] lg:text-[18px] '>Company</p>
              <p><Link to='/about' >About us</Link></p>
              <p><Link to='/services' >Services</Link></p>
              <p><Link to='/product' >Products</Link></p>
              <p><Link to='/Contact' >Contact</Link></p>
            </div>
            <div className='text-center md:text-left space-y-3 lg:space-y-6'>
              <p className='text-white font-[500] text-[14px] md:text-[17px] lg:text-[18px] '>Services</p>
              <p>Branding</p>
              <p>Web development</p>
              <p>Digital marketing</p>
              <p>Mobile app</p>
              <p>SEO</p>
              <p>User testing</p>
            </div>
            <div className='text-center md:text-left space-y-3 lg:space-y-6'>
              <p className='text-white font-[500] text-[14px] md:text-[17px] lg:text-[18px] '>Resources</p>
              <p><Link to='/blogs' >Blog</Link></p>
              <p><Link to='/cases' >Case study</Link></p>
              <p>Testimonials</p>
            </div>
            <div className='text-center md:text-left space-y-3 lg:space-y-6'>
              <p className='text-white font-[500] text-[14px] md:text-[17px] lg:text-[18px] '>Follow us</p>
              <p>LinkedIn</p>
              <p>Behance</p>
              <p>Dribble</p>
              <p>Twitter</p>
            </div>
          </div>
          <div className='pb-5 md:pb-0 flex flex-col items-center md:items-start space-y-4 lg:space-y-6'>
            <img src={tarslogo} className='h-[30px] lg:h-[44px] ' />
            <p className='text-[12px] md:text-[14px] '>Get latest updates</p>
            <input placeholder='Your email' className='rounded-[34px] w-[200px] md:w-[260px] h-[38px] md:h-[43px] pl-4 border-2 border-[#A1AEBF] bg-[#0F0F0F] text-white text-[12px]' />
          </div>
        </div>
        <p className='text-center pb-5 lg:pb-10 '>Copyright@ 2024-25<br className='block md:hidden '/> TARS Technologies | All rights reserved.</p>
      </div>
    </>
  )
}

export default Footer
