import React from 'react';
import List from './form/List';
import Footer from './form/Footer';
import Hero from './form/Hero';
import Navbar from './form/Navbar';
import Aboutus from './form/Aboutus';
import { toast } from "react-toastify";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <List />
      <List />
      <List />
      <Aboutus />
      <Footer />  
    </div>
  );
}

export default Home;
