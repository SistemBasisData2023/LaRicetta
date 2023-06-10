import React, { useState, useEffect } from "react";
import Forgot from "./form/Forgot";
import Login from "./form/Login";
import Register from "./form/Register";
import RecipeDetails from "./form/RecipeDetails";
import Home from "./Home";
import bg from "./assets/BG1.png";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    setToken(auth);
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const chosePage = () => {
    if (page === "recipeDetails") {
      return <RecipeDetails setPage={handlePageChange}/>;
    }
    if (page === "home") {
      return <Home setPage={handlePageChange} />;
    }
    if (page === "login") {
      return <Login setPage={handlePageChange} />;
    }
    if (page === "forgot") {
      return <Forgot setPage={handlePageChange} />;
    }
    if (page === "register") {
      return <Register setPage={handlePageChange} />;
    }
  };

  const pages = () => {
    if (token == null && (page === "login" || page === "forgot" || page === "register")) {
      return (
        <div
          className="min-h-screen flex justify-center items-center"
          style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
          <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
            {chosePage()}
          </div>
        </div>
      );
    } else {
      return <Home setPage={handlePageChange} />;
    }
  };

  return <React.Fragment>{pages()}</React.Fragment>;
}

export default App;
