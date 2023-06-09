import React from 'react';
import Logo from "../assets/Logopng.png"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='w-full bg-red-800 py-16'>
      <div className='max-w-[1240px] mx-auto flex flex-col px-4'>
        <div className='sm:flex text-center justify-between items-center'>
          <div className="flex items-center gap-2">
            <p className="text-white text-xl font-bold">La Ricetta</p>
          </div>
          <div className='flex justify-between w-full sm:max-w-[280px] my-4'>
            <FaFacebook className='icon' style={{ color: 'white' }} />
            <FaTwitter className='icon' style={{ color: 'white' }} />
            <FaInstagram className='icon' style={{ color: 'white' }} />
          </div>
        </div>
        <div className='flex justify-between'>
          <ul className='lg:flex text-white'>
            <li>About</li>
            <li>Partnerships</li>
            <li>Careers</li>
            <li>Newsroom</li>
            <li>Advertising</li>
          </ul>
          <ul className='text-right lg:flex text-white'>
            <li>Home</li>
            <li>Recipe</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
