import React from 'react'
import { useState } from 'react'

import rightarrow from '../../assets/icons/r-arrow.png'
import ai from '../../assets/images/AI.png'
import frontend from '../../assets/images/Frontend.png'
import dedicated from '../../assets/images/Dedicated.png'
import mobileapp from '../../assets/images/Mobile.png'
import AOS from 'aos';


const services = [
  { id: 1, title: "Entreprise Service", details: "details of 01" },
  { id: 2, title: "Expertise Service", details: "details of 02" },
  { id: 3, title: "Process", details: "details of 03" },
  { id: 4, title: "Mobile App Development", details: "details of 04" },
];

function Services() {
  const [openDetails, setOpenDetails] = useState(null);
  const toggleService = (index) => { setOpenDetails((prev) => (prev === index ? null : index)) }

  return (
    <>
      <div  data-aos="fade-up" className="py-10 lg:py-28 text-center bg-gradient-to-br from-[#1E1E1E] to-[#121212] text-white ">
        <p className="text-[12px] md:text-[16px] lg:text-[18px] text-[#9C9C9C] font-[500] ">
          Our Services
        </p>
        <p className="text-[16px] md:text-[22px] lg:text-[28px] mt-1 md:mt-3 px-6 md:px-0 uppercase font-[neutral_face]">
          Your Aspiration, Our Expertise: Tailored<br className='hidden md:block' /> Services for Unmatched Excellence.
        </p>

        <div className="py-5 lg:py-15 px-5 lg:px-30 font-[neutral_face] text-[14px] md:text-[18px] lg:text-[28px]">
          {services.map((service, index) => (
            <div
             
              key={service.id}
              className="border-b border-[#FFFFFF33] px-3 lg:px-5 py-6 lg:py-8"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 md:gap-8 lg:gap-20">
                  <p>{`0${service.id}`}</p>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFFFFF50] uppercase ">
                    {service.title}
                  </p>
                </div>
                <div
                  onClick={() => toggleService(index)}
                  className="cursor-pointer transition-transform duration-700"
                >
                  <img
                    src={rightarrow}
                    className={`w-7 md:w-10 lg:w-full transform transition-all duration-700  ${openDetails === index ? "-rotate-45" : "rotate-0"
                      }`}
                  />
                </div>

              </div>

                      
              {openDetails === index && (
                <div data-aos="zoom-out-down"  className="overflow-hidden transition-all duration-700   max-h-[1000px] opacity-100">
                  <p data-aos="fade-down" className="mt-6 lg:mt-12 border-l pl-3 lg:pl-5 border-[#9C9C9C] text-left text-[12px] lg:text-[18px] text-[#9C9C9C] lowercase">
                    {service.details}
                  </p>
                  <div data-aos="fade-up" className='flex flex-wrap justify-center gap-4 py-5'>
                    <img src={ai} className='w-35 lg:w-60 h-full' />
                    <img src={frontend} className='w-35 lg:w-60  h-full' />
                    <img src={dedicated} className='w-35 lg:w-60   h-full' />
                    <img src={mobileapp} className='w-35 lg:w-60   h-full' />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Services
