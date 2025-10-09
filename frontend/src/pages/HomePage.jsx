import React from 'react'
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

import herosectionimage from '../assets/images/herosectionimage.png'
import herosectionicon1 from '../assets/icons/herosectionicon1.png'
import herosectionicon2 from '../assets/icons/herosectionicon2.png'
import herosectionicon3 from '../assets/icons/herosectionicon3.png'
import herosectionicon4 from '../assets/icons/herosectionicon4.png'
import rightarrow from '../assets/icons/r-arrow.png'
import leftarrow from '../assets/icons/l-arrow.png'

import Testimonials from '../components/homecomponents/Testimonials';
import Clients from '../components/commoncomponents/Clients';
import GetinTouch from '../components/commoncomponents/GetinTouch';
import Counts from '../components/commoncomponents/Counts';
import Services from '../components/commoncomponents/Services';
import Products from '../components/commoncomponents/Products';
import Whoweare from '../components/commoncomponents/Whoweare';


function HomePage() {

  return (
    <>
      {/* hero section */}
      <div className='relative w-full min-h-screen lg:h-[900px] '>
        <img src={herosectionimage} className='absolute object-cover w-full h-full' />
        <div className='absolute right-7 lg:right-40 top-70 md:top-110 lg:top-86 space-y-3 lg:space-y-5'>
          <img src={herosectionicon1} className='w-9 md:w-auto' />
          <img src={herosectionicon2} className='w-9 md:w-auto' />
          <img src={herosectionicon3} className='w-9 md:w-auto' />
          <img src={herosectionicon4} className='w-9 md:w-auto' />
        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center tracking-wider text-white pt-35 lg:pt-45 '>
          <p className='text-[26px] md:text-[42px] lg:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF30] font-[neutral_face] '>ELEVATE YOUR VISION,<br className='block md:hidden' /> IGNITE<br className='hidden md:block' /> TOMORROW’S INNOVATION.</p>
          <p className='text-[10px] md:text-[16px] lg:text-[24px] mt-10 lg:mt-15'>Crafting Digital Excellence for a Future<br /> Beyond Imagination.</p>
          <div className='flex justify-center items-center gap-2 md:gap-4 lg:gap-20 mt-55 md:mt-70 lg:mt-53 text-[8px] md:text-[20px] lg:text-[24px] '>
            <p>Full Cycle Product Development</p>
            <p>Digital Product Design</p>
            <p>Branding</p>
            <p>Industry Automation Service</p>
          </div>
          <div className=' flex flex-col items-center gap-2 lg:gap-2 pt-12 md:pt-24 lg:pt-15 text-[13px] md:text-[15px] lg:text-[16px] font-[neutral_face]'>
            <p>SCROLL</p>
            <div className="relative flex flex-col items-center h-12">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 1, 0], y: [0, 10, 20] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.3, // sequence each arrow
                  }}
                  className="absolute top-0"
                >
                  <motion.button
                    onClick={() => {
                      const element = document.querySelector('#nextsection');
                      if (element) {
                        const targetY = element.getBoundingClientRect().top + window.pageYOffset;
                        const startY = window.scrollY;
                        const distance = targetY - startY;
                        const duration = 1200; // scroll duration (1.2s)
                        let startTime = null;

                        // Ease out bounce function (creates that soft bounce at the end)
                        const easeOutBounce = (x) => {
                          const n1 = 7.5625;
                          const d1 = 2.75;
                          if (x < 1 / d1) {
                            return n1 * x * x;
                          } else if (x < 2 / d1) {
                            return n1 * (x -= 1.5 / d1) * x + 0.75;
                          } else if (x < 2.5 / d1) {
                            return n1 * (x -= 2.25 / d1) * x + 0.9375;
                          } else {
                            return n1 * (x -= 2.625 / d1) * x + 0.984375;
                          }
                        };

                        const animation = (currentTime) => {
                          if (!startTime) startTime = currentTime;
                          const timeElapsed = currentTime - startTime;
                          const progress = Math.min(timeElapsed / duration, 1);
                          const ease = easeOutBounce(progress);
                          window.scrollTo(0, startY + distance * ease);
                          if (timeElapsed < duration) requestAnimationFrame(animation);
                        };

                        requestAnimationFrame(animation);
                      }
                    }}
                  >
                    <IoIosArrowDown size={23} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id='nextsection'>
        <Whoweare />
      </div>
      <Counts />
      <Services />
      <Products />

      {/* testimonials */}
      <div className="py-10 lg:py-28 text-center bg-gradient-to-b from-[#1E1E1E] to-[#121212] text-white ">
        <p className="text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] ">Testimonials</p>
        <p className="text-[16px] md:text-[22px] lg:text-[28px] lg:leading-12 mt-1 md:mt-3 px-6 md:px-0 uppercase font-[neutral_face]">Voices of Trust: Client Stories, Testimonials<br className='hidden md:block' /> that Illuminate Our Shared Success.        </p>
        <div className='flex flex-col md:flex-row gap-4 md:gap-5 lg:gap-16 px-6 md:px-5 lg:px-30 py-8 md:py-20'>
          <Testimonials
            image={herosectionimage}
          />
          <Testimonials
            image={herosectionimage}
          />
        </div>
        <div className='flex justify-center gap-5 '>
          <img src={leftarrow} className='w-8 md:w-10 lg:w-auto' />
          <img src={rightarrow} className='w-8 md:w-10 lg:w-auto' />
        </div>
      </div>


      <Clients />
      <GetinTouch />
    </>
  )
}

export default HomePage
