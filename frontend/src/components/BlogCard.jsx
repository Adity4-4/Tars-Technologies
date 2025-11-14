import React, { useEffect } from 'react'
import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'
import { Link } from 'react-router-dom'

function BlogCard({ images, tag, title, name, date, link }) {

    // format date safely
    const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) : "";

    return (
        <>
            <Link
                to={link}
                //  onClick={()=>{navigate(`/blogs-details/${id}`)}}
                className='bg-black w-[250px] md:w-[350px] p-2 md:p-3 space-y-1 rounded-[12px] cursor-pointer'
            >
                <img
                    src={images?.[0]?.url || mainBlog}
                    className="h-[170px] md:h-[240px] w-full object-cover rounded-[6px]"
                />
                <div className=' space-y-6 p-2 text-left '>
                    <p className='bg-[#4B6BFB4D] text-[#4B6BFB] w-[80px] md:w-[97px] py-1 px-2 inline text-[11px] md:text-[13px] rounded-[6px] '>{tag}</p>
                    <p className='text-[15px] md:text-[20px] font-bold leading-6 lg:leading-8 uppercase '>{title}</p>
                    <div className=' flex justify-between items-center gap-2 md:gap-3 text-[11px] md:text-[16px] text-[#97989F] '>
                        <div className='flex items-center gap-2 md:gap-3'>
                            <img src={blogProfile} className='w-[22px] md:w-[36px] ' />
                            <p>{name}</p>
                        </div>
                        <p className='ml-2'>{formattedDate}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default BlogCard
