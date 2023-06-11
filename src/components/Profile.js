import React, { useEffect } from "react";
import Card from "./sub/Profile-Card";
import AOS from "aos";
import "aos/dist/aos.css";
import data from "../data";
import bg from "./assets/BG3.png"
import Navbar from "./sub/Navbar";

function Profile() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  });
  return (
    <div>
      <Navbar />
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
      >
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div data-aos="fade-down" data-aos-duration="800">
            <Card />
          </div>
        </div>
      </div>
    </div>

  );
}
export default Profile;