import React from 'react'
import Sidebar from '../components/Sidebar'

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className='pl-5 md:pl-85 pt-24 md:pt-8 bg-gradient-to-l from-black to-[#1E1E1E] text-[#F5F9FE] min-h-screen p-8 md:p-16'>
        <p className='text-[25px] md:text-[38px] font-bold mb-4 md:mb-8 '>Welcome Admin</p>
      </div>
    </>
  )
}

export default Dashboard
