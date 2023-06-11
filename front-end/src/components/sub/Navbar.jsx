import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../assets/Logopng.png';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { FaAngleUp } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [logo, setLogo] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNav = () => {
    setNav(!nav);
    setLogo(!logo);
  };

  const handleHome = () => {
    navigate('/home');
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search submit logic here
    console.log('Search query:', searchQuery);
    setSearchQuery('');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === '/home';

  return (
    <div className={`flex w-full justify-between items-center h-20 px-4 z-10 text-white ${isSticky ? 'sticky top-0' : ''} ${isHomePage ? 'bg-red-800' : 'bg-red-800 bg-opacity-100'}`}>
      <div className="flex items-center gap-2">
        <img src={Logo} onClick={handleHome} className="w-10 object-cover" alt="Logopng" />
        <p onClick={handleHome} className="text-headingcolor text-xl font-bold"> La Ricetta</p>
      </div>
      <ul className="hidden md:flex">
        <li><Link to="/home">Home</Link></li>
        <li>
          <ScrollLink
            to="recipes"
            smooth={true}
            duration={500}
            offset={-50} // Adjust the offset as needed
          >
            Recipes
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            offset={-50} // Adjust the offset as needed
          >
            About Us
          </ScrollLink>
        </li>
        <li>
          <ScrollLink
            to="footer"
            smooth={true}
            duration={500}
            offset={-50} // Adjust the offset as needed
          >
            Contact
          </ScrollLink>
        </li>
      </ul>
      <div className="flex items-center">
        <div className="">
          <FaAngleUp
            size={20}
            onClick={handleScrollToTop}
            className="cursor-pointer ml-10 mr-5" />
        </div>
        <div className="">
          <BiSearch
            size={20}
            onClick={handleSearch}
            className="cursor-pointer mr-5"
          />
          {searchOpen && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute right-0 mt-8 mr-2 bg-white p-2 rounded shadow-md"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchQuery}
                className="border border-red-800 text-black px-2 py-1 rounded"
              />
            </form>
          )}
        </div>
        <Link to="/profile">
          <BsPerson size={20} />
        </Link>
      </div>

      {/* Hamburger */}
      <div onClick={handleNav} className="md:hidden z-10">
        {nav ? (
          <AiOutlineClose className="text-white" size={20} />
        ) : (
          <HiOutlineMenuAlt4 size={20} />
        )}
      </div>

      {/* Mobile menu dropdown */}
      <div
        onClick={handleNav}
        className={nav ? "absolute text-white left-0 top-0 w-full px-4 py-7 flex flex-col" : "absolute left-[-100%]"}
      >
        <ul>
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              className="w-10 object-cover border-b"
              alt="Logopng"
            />
            <p className="text-white text-xl font-bold"> La Ricetta</p>
          </div>
          <li className="border-b">Home</li>
          <li className="border-b">Recipe</li>
          <li className="border-b">About Us</li>
          <li className="border-b">Contact</li>
          <div className="flex flex-col">
            <button onClick={handleProfile}>Account</button>
          </div>
          <div className="flex justify-between my-6">
            <FaAngleUp className="icon" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;