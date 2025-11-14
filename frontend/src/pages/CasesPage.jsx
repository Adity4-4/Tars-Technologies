import React, { useEffect, useState } from 'react'
import axios from 'axios'

import HeroSection from '../components/commoncomponents/HeroSection'
import CaseCard from '../components/commoncomponents/CaseCard'
import GetinTouch from '../components/commoncomponents/GetinTouch'

function CasesPage() {
  const [cases, setCases] = useState([])
  const [showAll, setShowAll] = useState(false) // toggle between showing 5 or all

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cases")
        setCases(res.data)
      } catch (error) {
        console.error("Enter fetching Cases", error)
      }
    }
    fetchCases();
  }, [])

  // load more
  const handleToggle = () => {
    setShowAll(prev => !prev) // toggle showAll
  }

  const visibleCount = showAll ? cases.length : 5  // determine how many to show

  return (
    <>
      <HeroSection
        heading={`CASES`}
        description={`At Tars Technology, every case study tells a story of transformation. By combining innovative design, powerful technology, and user-centered thinking, we help businesses overcome challenges and unlock measurable success.`}
        section='#nextsection'
      />
      <div id='nextsection' className='py-10 lg:py-28 text-center bg-gradient-to-b from-black to-[#1E1E1E] text-white '>
        <p className='text-[12px] lg:text-[18px] text-[#9C9C9C] font-[500] '>Case Study</p>
        <p className='text-[16px] lg:text-[28px] mt-1 md:mt-3 uppercase font-[neutral_face]'>Case Studies That Reflect Our<br /> Commitment to Excellence</p>
        <div className='lg:ml-28'>
          {cases.length > 0 ? (
            cases.slice(0, visibleCount).map((item) => (
              <CaseCard
                key={item._id}
                image={item.images}
                title={item.title}
                description={item.description}
                contentDiv='w-[260px] lg:w-[450px]'
                showText={false}
                button='Know More &nbsp; →'
                link={`/cases-details/${item._id}`}
              />
            ))
          ) : (
            <p className='text-gray-400'>Loading...</p>
          )}
        </div>

        {/* toggle button */}
        {cases.length > 5 && (
          <button
            onClick={handleToggle}
            className='w-[90px] md:w-[120px] py-3 mt-14 text-[12px] md:text-[16px] rounded-[6px] border hover:bg-white hover:text-black duration-500 '
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        )}

      </div>

      <GetinTouch />
    </>
  )
}

export default CasesPage
