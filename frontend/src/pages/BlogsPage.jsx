import React, { useEffect, useState } from 'react'
import axios from 'axios'
import HeroSection from '../components/commoncomponents/HeroSection'
import GetinTouch from '../components/commoncomponents/GetinTouch'

import mainBlog from '../assets/images/main-blog.jpg'
import blogProfile from '../assets/images/blog-profile.png'
import BlogCard from '../components/BlogCard'

function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(false) // toggle between showing 3 or all

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs")
        setBlogs(res.data)
      } catch (err) {
        console.error("Error fetching Blogs", err)
      }
    }
    fetchCases();
  }, [])

  // load more
  const handleToggle = () => {
    setShowAll(prev => !prev) // toggle showAll
  }

  const visibleCount = showAll ? blogs.length : 3 // determine how many to show

  return (
    <>
      <HeroSection
        heading={`BLOGS`}
        description={`Our blogs are more than just insights — they are a window into innovation. We share knowledge, ideas, and future-focused trends to keep you inspired, informed, and ready to embrace the next big opportunity.`}
        section='#nextsection'
      />
      <div id='nextsection' className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Blogs</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>THE TARS PERSPECTIVE</p>
        <div className='relative'>
          <img src={mainBlog} className='h-[220px] md:h-[450px] w-[330px] md:w-[1200px] object-cover mx-auto mt-18 rounded-[12px] ' />
          <div className='absolute bottom-2 lg:bottom-10 left-7 lg:left-50 space-y-2 md:space-y-5 '>
            <p className='bg-[#4B6BFB] w-[82px] md:w-[97px] py-1 text-[10px] md:text-[14px] rounded-[6px]  '>Technology</p>
            <p className='text-[14px] md:text-[36px] text-left font-semibold leading-5 md:leading-11 '>The Impact of Technology on the<br /> Workplace: How Technology is Changing</p>
            <div className='text-[12px] md:text-[16px] flex items-center gap-3'>
              <img src={blogProfile} className='w-[24px] md:w-[36px]  ' />
              <p>Tracey Wilson</p>
              <p className='ml-1 md:ml-2'>August 20, 2022</p>
            </div>
          </div>
        </div>

        <div className='flex flex-wrap flex-col md:flex-row justify-center items-center gap-14 py-6 md:py-10 '>
          {blogs.length > 0 ? (
            blogs.slice(0, visibleCount).map((item) => (
              <BlogCard
                key={item._id}
                name={item.name}
                title={item.title}
                tag={item.tag}
                date={item.date}
                images={item.images}
                link={`/blogs-details/${item._id}`}
              />
            ))
          ) : (
            <p className='text-gray-400'>Loading...</p>
          )}
        </div>

        {blogs.length > 3 && (
          <button
            onClick={handleToggle}
            className='w-[90px] md:w-[120px] py-3 text-[12px] md:text-[16px] rounded-[6px] border'
          >
            {showAll ? 'View Less' : 'Load More'}
          </button>
        )}
      </div>

      <GetinTouch />
    </>
  )
}

export default BlogsPage
