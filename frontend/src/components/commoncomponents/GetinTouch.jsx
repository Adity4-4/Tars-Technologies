import React from 'react'
import { useState } from 'react'
import flag1 from '../../assets/images/indian-flag.png'
import flag2 from '../../assets/images/canada-flag.png'
import flag3 from '../../assets/images/uae-flag.png'

function GetinTouch() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    email: "",
    requirement: "",
  })

  // Update state whenever user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  // Submit form  (send to backend) 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/getintouch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // send state a JSON
      });

      const data = await res.json();
      alert(data.message || "Submitted"); // success message
      setFormData({ name: "", companyName: "", email: "", requirement: "" });  // reset form

    } catch (err) {
      console.error("Error submitting form:", err)
    }
  } 

  const officeData = [
    {
      image: flag1,
      title: "Development Office",
      address: `81, Gotmare Complex, Dharampeth , WHC Road,
      Nagpur , Maharashtra, India - 440010`
    },

  ]

  return (
    <>
      <div className='flex flex-col md:flex-row gap-8 lg:gap-17 px-4 lg:px-24 py-10 lg:py-28 bg-gradient-to-bl from-[#121212] to-[#1E1E1E] text-white '>
        <div className=' md:w-1/2 px-5 md:px-6 lg:px-13 py-6 md:py-5 lg:py-8 space-y-6 lg:space-y-6 border border-[#F9F9F9] '>
          <p className='text-[14.5px] md:text-[20px] lg:text-[22px] mt-1 md:mt-3 uppercase font-[neutral_face] leading-7 md:leading-9 lg:leading-10'>Your Vision, Our Mission: Let's<br className='hidden lg:block' /> Shape Success Together.</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 lg:gap-5 text-white text-[14px] md:text-[16px] lg:text-[16px] '>
            <input 
              type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' required  
              className='bg-[#302e2e] h-[45px] md:h-[48px] lg:h-[50px] pl-3 md:pl-4 lg:pl-5 ' 
            />
            <input 
              type='text' name='companyName' value={formData.companyName} onChange={handleChange} placeholder='Company Name' required 
              className='bg-[#302e2e] h-[45px] md:h-[48px] lg:h-[50px] pl-3 md:pl-4 lg:pl-5 ' 
            />
            <input 
              type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email Address' required 
              className='bg-[#302e2e] h-[45px] md:h-[48px] lg:h-[50px] pl-3 md:pl-4 lg:pl-5 ' 
            />
            <textarea 
              name='requirement' value={formData.requirement} onChange={handleChange} placeholder='Describe Your Requirement' required 
              className='bg-[#302e2e] h-[100px] md:h-[120px] lg:h-[120px] pl-3 md:pl-4 lg:pl-5 pt-1.5 md:pt-4 ' 
            />
            <button type='submit' className='mt-3 md:mt-4 w-[110px] md:w-[120px] lg:w-[160px] h-[40px] md:h-[45px] lg:h-[50px] rounded-[8px] bg-white text-black hover:bg-[#b8b6b6] duration-300 text-[13px] md:text-[17px] lg:text-[16px] '>Submit &nbsp; →</button>
          </form>
        </div>
        <div className=' md:w-1/2 '>
          <p className='text-[12px] md:text-[15px] lg:text-[16px] text-[#9C9C9C] font-[500] '>Get in Touch</p>
          <p className='text-[14px] md:text-[18px] lg:text-[22px] mt-1 md:mt-2 uppercase font-[neutral_face] leading-7 md:leading-9 lg:leading-10 '>Connect for Excellence: Your<br /> Gateway to Exceptional<br /> Solutions.</p>
          <div className='flex flex-wrap gap-x-6 md:gap-x-8 lg:gap-x-18 gap-y-7 pt-6 '>
            {officeData.map((office, index) => (
              <div key={index} className='w-[150px] md:w-[160px] lg:w-[190px] '>
                <img src={office.image} className=' h-[32px] lg:h-[45px] ' />
                <p className='text-[14px] md:text-[15px] lg:text-[16px] font-[600] mt-6 lg:mt-6 mb-2 lg:mb-2' >{office.title}</p>
                <p className=' text-[11px] md:text-[12px] lg:text-[14px] leading-5 lg:leading-6 '>{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default GetinTouch
