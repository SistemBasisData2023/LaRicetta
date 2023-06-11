import React, { useState } from 'react';
import axios from 'axios';
import Footer from './sub/Footer';
import Hero from './sub/Hero';
import Navbar from './sub/Navbar';
import Aboutus from './sub/Aboutus';
import Card from './sub/Card';
import { toast } from 'react-toastify';
import { Element, Link as ScrollLink } from "react-scroll";

function Home() {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(`http://localhost:3000/home?search=${searchTerm}`);
      setSearchResult(response.data);
    } catch (error) {
      toast.error('No results.');
    }
  };

  return (
    <div>
      <Navbar />
      <Hero onSearch={handleSearch} />
      {searchResult.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {searchResult.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <React.Fragment>
          <Element name="recipes" className="element">
            <recipes id="recipes"><Card /></recipes>
            <recipes id="recipes"><Card /></recipes>
            <recipes id="recipes"><Card /></recipes>
          </Element>
        </React.Fragment>
      )}
      <Element name="about" className="element">
        <about id="about"><Aboutus /></about>
      </Element>
      <Element name="footer" className="element">
        <footer id="footer"><Footer /></footer>
      </Element>
    </div>
  );
}

export default Home;