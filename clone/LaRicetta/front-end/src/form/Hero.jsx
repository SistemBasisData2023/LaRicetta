import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import videoBG from '../assets/VideoBG.mp4';

const Hero = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="w-full h-screen relative">
      <video
        className="w-full h-full object-cover"
        src={videoBG}
        autoPlay
        loop
        muted
      />
      <div className="absolute w-full h-full top-0 left-0">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to top, rgb(255, 255, 255) 5%, rgba(255, 149, 20, 0) 40%)',
          }}
        ></div>
        <div className="absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4">
          <h1 className="mb-4">What do you want to eat?</h1>
          <form
            className="flex justify-between items-center max-w-[700px] mx-auto w-full border p-1 rounded-md text-black bg-gray-100/90"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className="bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none"
                type="text"
                placeholder="Find Recipe"
                value={searchQuery}
                onChange={handleChange}
              />
            </div>
            <div>
              <button type="submit">
                <AiOutlineSearch
                  size={20}
                  className="icon"
                  style={{ color: '#9D0208' }}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
