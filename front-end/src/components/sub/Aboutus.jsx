import React from 'react';
import { RiCustomerService2Full, RiCustomerService2Fill } from 'react-icons/ri';
import { MdOutlineTravelExplore } from 'react-icons/md';
import { FaRegCircle } from "react-icons/fa";
import logo from "../assets/Logopng1.png"

const Aboutus = () => {
  return (
    <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-4 px-4 py-16'>
      <div className='lg:col-span-2 flex flex-col justify-evenly'>
        <div>
          <h2>ABOUT US</h2>
          <p className='py-4'>
            La Ricetta, where culinary inspiration meets delightful flavors.
            We believe that everyone can be a chef in their own kitchen, and our
            website is here to guide you every step of the way.
          </p>
          <p className='py-1'>
            There are some benefits by having a variety of dishes, such as:
          </p>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            <li style={{ display: "flex", alignItems: "center" }}>
              <FaRegCircle style={{ color: "#9D0208", marginRight: "5px" }} />
              <span>It ensures a diverse and balanced diet, providing a wide range of nutrients.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <FaRegCircle style={{ color: "#9D0208", marginRight: "5px" }} />
              <span>It prevents culinary monotony and keeps meals exciting and enjoyable.</span>
            </li>
            <li style={{ display: "flex", alignItems: "center" }}>
              <FaRegCircle style={{ color: "#9D0208", marginRight: "5px" }} />
              <span>It encourages creativity and culinary skills development in the kitchen.</span>
            </li>
          </ul>
          <p className='py-1'>
            With our carefully curated collection of recipes, you'll find a diverse range of culinary delights to suit any taste, occasion, or dietary preference.

          </p>
        </div>
      </div>
      <div className='mt-20'>
        <img src={logo} className="w-40 mx-auto" alt="Logopng" />
        <h1 className='justify-self-center font-bold text-center size-30px'>La Ricetta</h1>
      </div>
    </div>
  );
};

export default Aboutus;
