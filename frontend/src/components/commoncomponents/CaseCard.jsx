import React from 'react'
import { Link } from 'react-router-dom'


function CaseCard({ id, image, title, contentDiv = 'md:w-[260px] lg:w-[400px]', showText = true, description, button, link }) {

  return (
    <>
      <div className='flex flex-col md:flex-row gap-5 lg:gap-12 px-5 lg:px-20 pt-6 lg:pt-14 '>
        <img src={image?.[0]?.url} className='w-full md:w-1/2' />

        <div className=' space-y-5 lg:space-y-10 text-left w-[500px] ' >
          <p className='text-[18px] lg:text-[28px] '>{title}</p>
          <div className={`${contentDiv} space-y-5 lg:space-y-10 text-[12px] lg:text-[20px] `} >
            {showText && (
              <p>Embark on a journey through our narrative, where innovation meets purpose.</p>
            )}
            <p>{description}</p>
          </div>

          <Link to={link}>
            <button className='w-[130px] lg:w-[202px] h-[40px] lg:h-[56px] rounded-[8px] border hover:bg-white hover:text-black duration-500 text-[13px] lg:text-[16px] '>{button}</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default CaseCard
