import React, { useEffect } from "react";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import RecipeDetails from "./components/RecipeDetails";
import AddRecipe from "./components/AddRecipe";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipe" element={<RecipeDetails />} />
      <Route path="/addRecipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}
export default App;