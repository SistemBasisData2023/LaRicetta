import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { FaPizzaSlice, FaSignOutAlt } from "react-icons/fa";

function Card({ name, birth, sex, email, recipes }) {
  const navigate = useNavigate();

  const profileData = {
    name: "John Doe",
    birth: "January 1, 1990",
    sex: "Male",
    email: "johndoe@example.com",
    recipes: ["Pizza", "Pasta", "Burger"],
  }

  const handleAddRecipe = () => {
    navigate("/addrecipe");
  };

  const handleLogout = () => {
    navigate("/login");
    alert('See You!');
  };

  return (
    <div className="w-full">
      <div className="w-32 h-32 mx-auto flex items-center justify-center shadow-xl rounded-full bg-white">
        <FaPizzaSlice size={48} />
      </div>
      <div className="text-center mt-5">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900">
          {profileData.name}
        </p>
        <p className="text-xs sm:text-base text-gray-800 ">
          {profileData.birth}

        </p>
        <p className="text-xs sm:text-base text-gray-800 ">
          {profileData.sex}

        </p>
        <p className="text-xs sm:text-base text-gray-800 ">
          {profileData.email}

        </p>
        <div>
          <h3 className="text-lg font-semibold mb-2 mt-5">My Recipes:</h3>
          {profileData.recipes}
        </div>
        <button onClick={handleAddRecipe}
          className="bg-blue-500 hover:bg-blue-700 mx-auto text-white font-bold py-2 px-4 rounded-full mt-5 flex items-center justify-center"
        >
          Add Recipe
        </button>
        <button
          onClick={handleLogout}
          className="mx-auto text-white font-bold py-2 px-4 rounded-full mt-5 flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
