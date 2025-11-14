import React from 'react'
import whoweare from '../../assets/images/whoweare.png'

function Whoweare() {
  return (
    <>
      <div className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Who We Are</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Epic Beginnings: Unveiling Our Essence,<br className='hidden md:block' /> Crafting Futures with Excellence.</p>
        <div className='flex flex-col md:flex-row gap-5 lg:gap-12 px-5 lg:px-20 pt-6 lg:pt-14 '>
          <img src={whoweare} className='md:w-1/2' />
          <div className=' space-y-5 lg:space-y-10 text-left w-[500px] ' >
            <p className='text-[18px] lg:text-[28px] '>Empowering Progress: Our Story, Your Journey, Shared Excellence.</p>
            <div className='space-y-5 lg:space-y-10 text-[12px] lg:text-[20px]' >
              <p>Embark on a journey through our narrative, where innovation meets purpose.</p>
              <p>Lorem ipsum dolor sit amet consectetur. Sit non diam justo fames. Blandit et purus mollis convallis malesuada egestas risus quam enim. Semper lorem rhoncus et felis tristique tellus volutpat orci. Dui elementum a sed.</p>
            </div>
            <button className='w-[130px] lg:w-[202px] h-[40px] lg:h-[56px] rounded-[8px] border hover:bg-white hover:text-black duration-500 text-[13px] lg:text-[16px] '>Who We Are &nbsp; →</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Whoweare
