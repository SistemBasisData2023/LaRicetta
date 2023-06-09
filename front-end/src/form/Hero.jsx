import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import videoBG from '../assets/VideoBG.mp4';

const Hero = () => {
  return (
    <div className='w-full h-screen relative'>
      <video
        className='w-full h-full object-cover'
        src={videoBG}
        autoPlay
        loop
        muted
      />
      <div className='absolute w-full h-full top-0 left-0'>
        <div
          className='absolute top-0 left-0 w-full h-full'
          style={{
            background: 'linear-gradient(to top, rgb(255, 255, 255) 5%, rgba(255, 149, 20, 0) 40%)',
          }}
        ></div>
        <div className='absolute top-0 w-full h-full flex flex-col justify-center text-center text-white p-4'>
          <h1 className='mb-4'>What do you want to eat?</h1>
          <form
            className='flex justify-between items-center max-w-[700px] mx-auto w-full border p-1
            rounded-md text-black bg-gray-100/90'
          >
            <div>
              <input
                className='bg-transparent w-[300px] sm:w-[400px] font-[Poppins] focus:outline-none'
                type='text'
                placeholder='Find Recipe'
              />
            </div>
            <div>
              <button>
                <AiOutlineSearch size={20} className='icon' style={{ color: '#ffffff' }} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
