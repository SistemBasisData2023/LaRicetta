import React, { useState } from 'react';
import Logo from "../assets/Logopng.png"
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false)
  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo)
  };

  return (
    <div className='flex w-full justify-between items-center h-20 px-4 absolute z-10 text-white'>
      <div className="flex items-center gap-2">
        <img src={Logo} onClick={handleNav} className="w-10 object-cover" alt="Logopng" />
        <p className="text-headingcolor text-xl font-bold"> La Ricetta</p>
      </div>
      <ul className='hidden md:flex'>
        <li>Home</li>
        <li>Recipe</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className='hidden md:flex'>
        <BiSearch className='' size={20} />
        <BsPerson size={20} />
      </div>

      {/* Hamburger */}
      <div onClick={handleNav} className='md:hidden z-10'>
        {nav ? <AiOutlineClose className='text-black' size={20} /> : <HiOutlineMenuAlt4 size={20} />}
      </div>

      {/* Mobile menu dropdown */}
      <div onClick={handleNav} className={nav ? 'absolute text-black left-0 top-0 w-full bg-gray-100/90 px-4 py-7 flex flex-col' : 'absolute left-[-100%]'}>
        <ul>
          <div className="flex items-center gap-2">
            <img src={Logo} className="w-10 object-cover border-b" alt="Logopng" />
            <p className="text-headingcolor text-xl font-bold border-b"> La Ricetta</p>
          </div>
          <li className='border-b'>Home</li>
          <li className='border-b'>Recipe</li>
          <li className='border-b'>About Us</li>
          <li className='border-b'>Contact</li>
          <div className='flex flex-col'>
            <button className='my-6'>Search</button>
            <button>Account</button>
          </div>
          <div className='flex justify-between my-6'>
            <FaFacebook className='icon' />
            <FaTwitter className='icon' />
            <FaInstagram className='icon' />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
