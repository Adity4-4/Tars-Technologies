import React from 'react'

function People({picture, name, position}) {
    return (
        <>
            <div className='text-center space-y-3 lg:space-y-4 flex flex-col items-center'>
                <img src={picture} className='w-[140px] md:w-[210px] lg:w-[285px] h-[160px] md:h-[230px] lg:h-[290px] border-[0.5px] rounded-[10px] ' />
                <p className='text-[13px] md:text-[18px] lg:text-[20px] font-semibold '>{name}</p>
                <p className='text-[11px] md:text-[16px] lg:text-[18px] '>{position}</p>
            </div>
        </>
    )
}

export default People
