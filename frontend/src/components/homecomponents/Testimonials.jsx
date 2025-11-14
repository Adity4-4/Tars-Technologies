import React from 'react'

function Testimonials({image}) {
    return (
        <>
            <div  className='flex gap-2 lg:gap-5'>
                <img  data-aos="zoom-out-up" src={image} className='w-[120px] md:w-[180px] h-[160px] md:h-[200px] ' />
                <div  data-aos="zoom-out-up" className='flex flex-col justify-between text-left p-1 md:p-2'>
                    <p className='text-[17px] md:text-[19px] lg:text-[22px] '>Jacob</p>
                    <p className='text-[#9C9C9C] text-[10px] md:text-[12px] '>CEO - IT Solution Company</p>
                    <p className='text-[10px] md:text-[12px] lg:text-[16px] font-[300] lg:leading-7'>Lorem ipsum dolor sit amet consectetur. Bibendum quis fringilla odio maecenas magna eu ultrices aliquam egestas. Enim phasellus eu commodo nibh vitae amet elit. Ut natoque dui.</p>
                </div>
            </div>
        </>
    )
}

export default Testimonials
