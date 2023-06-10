import React, { useState } from 'react';
import axios from 'axios';
import Footer from './form/Footer';
import Hero from './form/Hero';
import Navbar from './form/Navbar';
import Aboutus from './form/Aboutus';
import Card from './form/Card';
import { toast } from 'react-toastify';

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
          <Card />
          <Card />
          <Card />
        </React.Fragment>
      )}
      <Aboutus />
      <Footer />
    </div>
  );
}

export default Home;