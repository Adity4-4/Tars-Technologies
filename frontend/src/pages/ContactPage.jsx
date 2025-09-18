import React from 'react'
import herosectionimage from '../assets/images/herosectionimage.png'
import tarslogo from '../assets/icons/tarslogo.png'
import Contact from '../assets/images/Contact-1.svg'
import ContactBtn from '../assets/images/Contact-btn.png'

function ContactPage() {
  return (
    <>
      <div className='relative '>
        <img src={herosectionimage} className=' object-cover w-full h-[1110px] md:h-[910px]' />
        <div className='absolute inset-0 top-8 lg:-top-13 flex flex-col justify-center items-center text-center tracking-wider text-white pt-20 lg:pt-42 '>
          <p className='text-[38px] lg:text-[81px] font-[Inter] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF30] font-[800] '>Get in touch</p>
          <p className='mb-11 text-[12px] lg:text-[22px] font-[500] '>Reach out, and let's create a universe of possibilities together!</p>
          <div className='flex flex-col md:flex-row items-center gap-10 p-5 mx-3 lg:mx-44 rounded-[20px] bg-[#0A0D17] font-[Inter]'>
            <div className='px-2 lg:px-8 py-3 md:py-0 md:w-1/2 '>
              <p className='text-[18px] lg:text-[30px] font-[600] text-left '>Let’s connect constellations</p>
              <p className='text-[10px] lg:text-[16px] mb-5 md:mb-10 text-left '>Let's align our constellations! Reach out and let the<br className='hidden md:block '/> magic of collaboration with Tars Technologies.</p>
              <div className='flex flex-col gap-3 text-[#FFFFFF99] text-[12px] md:text-[15px] '>
                <div className='flex gap-3 '>
                  <input placeholder='Last Name' className='w-full h-[42px] pl-3 border border-[#FFFFFF33] rounded-[5px] bg-[#FFFFFF0D] ' />
                  <input placeholder='First Name' className='w-full h-[42px] pl-3 border border-[#FFFFFF33] rounded-[5px] bg-[#FFFFFF0D] ' />
                </div>
                <input placeholder='Email' className='h-[42px] pl-3 border border-[#FFFFFF33] rounded-[5px] bg-[#FFFFFF0D]' />
                <input placeholder='Phone Number' className='h-[42px] pl-3 border border-[#FFFFFF33] rounded-[5px] bg-[#FFFFFF0D] ' />
                <input placeholder='Message' className='h-[100px] pl-3 border border-[#FFFFFF33] rounded-[5px] bg-[#FFFFFF0D] ' />
              </div>
              <div className='w-full h-[42px] mt-3 flex justify-center items-center gap-2 text-[12px] md:text-[15px] bg-gradient-to-r from-[#000000] to-[#545454] rounded-[5px] '>
                <button>Send it to the TARS</button>
                <img src={ContactBtn} />
              </div>
            </div>
            <div className='relative '>
              <img src={tarslogo} className='absolute top-5 left-5 w-[100px] md:w-[200px] ' />
              <img src={Contact} className=' w-[530px] ' />
            </div>
          </div>
        </div>
      </div>
      <div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6143.883931520455!2d79.05657134242165!3d21.139409934459813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c16fe7f30a71%3A0x96d1eb35911d1226!2sTARS%20Technologies!5e0!3m2!1sen!2sin!4v1758111187127!5m2!1sen!2sin"
          className='w-full h-[200px] lg:h-[500px] ' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  )
}

export default ContactPage
