import React from 'react'
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

import herosectionimage from '../../assets/images/herosectionimage.png'
import herosectionicon1 from '../../assets/icons/herosectionicon1.png'
import herosectionicon2 from '../../assets/icons/herosectionicon2.png'
import herosectionicon3 from '../../assets/icons/herosectionicon3.png'
import herosectionicon4 from '../../assets/icons/herosectionicon4.png'

function HeroSection({ heading, description, section }) {
  return (
    <>
      <div className='relative '>
        <img src={herosectionimage} className=' object-cover w-full h-[920px] lg:h-[730px]' />

        {/* Inset shadow overlay */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,1)]"></div>

        <div className='absolute right-7 lg:right-10 top-130 lg:top-140 
            flex md:flex-row md:flex-wrap 
            space-y-1.4 gap-3 md:space-y-1.5 md:space-x-1.5 
            lg:space-x-5 z-50 '>
          <img  
            src={herosectionicon1} className='w-9 md:w-auto'
            onClick={() => window.open('https://www.linkedin.com/company/tars-technologies/posts/?feedView=all', '_blank', "noopener,noreferrer")}
          />
          <img
            src={herosectionicon2} className='w-9 md:w-auto'
            onClick={() => window.open('https://www.behance.net/tarstechnol', '_blank', "noopener,noreferrer")}
          />
          <img src={herosectionicon3} className='w-9 md:w-auto' />
          <img
            src={herosectionicon4} className='w-9 md:w-auto'
            onClick={() => window.open('https://medium.com/@tarstechnologiesco', '_blank', "noopener,noreferrer")}
          />

        </div>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-center tracking-wider text-white pt-20 md:pt-38 lg:pt-42 z-10'>
          <p className='text-[26px] md:text-[35px] lg:text-[48px] text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF30] font-[neutral_face] '>{heading}</p>
          <p className='w-[326px] md:w-[700px] lg:w-[1000px] text-[11px] md:text-[16px] lg:text-[24px] mt-8 lg:mt-24 tracking-widest leading-7 lg:leading-10'>{description}</p>
          <div className=' flex flex-col items-center gap-2 lg:gap-2 pt-60 md:pt-50 lg:pt-30 mb-20 text-[13px] lg:text-[16px] font-[neutral_face]'>
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
                    delay: i * 0.3,
                  }}
                  className="absolute top-0"
                >
                  {/* Added bounce + smooth scroll */}
                  <motion.button
                    onClick={() => {
                      const element = document.querySelector(section);
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
    </>
  )
}

export default HeroSection
