import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import tarslogo from '../assets/icons/tarslogo.png'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";


const navLinks = [
  { path: "/about", label: "ABOUT" },
  { path: "/services", label: "SERVICES" },
  { path: "/product", label: "PRODUCT" },
  { path: "/cases", label: "CASES" },
  { path: "/blogs", label: "BLOGS" },
  { path: "/Contact", label: "Contact" },
]


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const activeClass = " border-b border-white pb-1 duration-500"

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // hide/show nav logic
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      // bg logic
      setIsScrolled(currentScrollY > 0)

      setLastScrollY(currentScrollY);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <nav
        className={`fixed w-full z-50 flex justify-between items-center px-6 lg:px-16 py-6 lg:py-8 text-white transition-all duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled ? "bg-black shadow-md" : "bg-transparent"}`}
      >
        {/* logo */}
        <NavLink to='/'>
          <img src={tarslogo} className='w-[100px] lg:w-[190px] ' />
        </NavLink>

        {/* desktop nav */}
        <div className='hidden md:flex gap-8 lg:gap-14 text-[16px] '>
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path} to={path}
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* desktop button */}
        <button className='hidden md:block border border-white rounded-[8px] w-[196px] h-[49px] text-[18px] font-[600] hover:bg-white hover:text-black duration-300 '>Get a Free Quote</button>

        {/* mobile toggle button */}
        <div className='block md:hidden'>
          <button onClick={toggleMenu} aria-label='Toggle Menu' >
            {isMenuOpen ? (
              <IoCloseOutline className='text-white w-5 md:w-7 h-auto ' />
            ) : (
              <RxHamburgerMenu className='text-white w-5 md:w-7 h-auto' />
            )}
          </button>
        </div>
      </nav>

      {/* mobile nav */}
      {isMenuOpen && (
        <div className='md:hidden fixed w-full z-40  flex flex-col items-center space-y-5 pt-20 pb-7 bg-black text-white text-[12px] '>
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path} to={path} onClick={toggleMenu}
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              {label}
            </NavLink>
          ))}

          <button onClick={toggleMenu} className='border border-white rounded-[8px] w-[130px] h-[35px] font-[600] hover:bg-white hover:text-black duration-300 '>Get a Free Quote</button>
        </div>
      )}
    </>
  )
}

export default Navbar
