import React from 'react'
import whoweare from '../../assets/images/whoweare.png'
import Aos from 'aos'


function Whoweare() {
  return (
    <>
      <div className='py-10 lg:py-18  text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white  '>
        <p data-aos="fade-down" className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] lg:pl-2'>Who We Are</p>
        <p data-aos="fade-down" className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face] lg:pl-2'>Epic Beginnings: Unveiling Our Essence,<br className='hidden md:block' /> Crafting Futures with Excellence.</p>
        <div className='flex flex-col md:flex-row gap-5 lg:gap-12 px-5 lg:px-20 pt-6 lg:pt-14 lg:ml-28'>
          <img data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine"src={whoweare} className='md:w-1/2' />
          <div data-aos="fade-left" data-aos-offset="300" className=' space-y-5 lg:space-y-10 text-left md:w-[500px] ' >
            <p className='text-[18px] lg:text-[28px] '>Empowering Progress: Our Story, Your Journey, Shared Excellence.</p>
            <div  className='space-y-5 lg:space-y-10 text-[12px] lg:text-[20px]' >
              <p>Embark on a journey through our narrative, where innovation meets purpose.</p>
              <p>TARS Technologies consisting of highly skilled enthusiasts who dream of making this world an intelligent and fulfilled place by empowering organizations to gain a lucrative & sustainable edge. Loaded with Information Technology tools.</p>
            </div>
            <button  className='w-[130px] lg:w-[202px] h-[40px] lg:h-[56px] rounded-[8px] border hover:bg-white hover:text-black duration-500 text-[13px] lg:text-[16px] '>Who We Are &nbsp; →</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Whoweare
