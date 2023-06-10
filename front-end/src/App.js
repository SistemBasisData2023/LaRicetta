import React, { useState, useEffect } from "react";
import Forgot from "./form/Forgot";
import Login from "./form/Login";
import Register from "./form/Register";
import Home from "./Home";
import bg from './assets/BG1.png';

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("auth_token");
    setToken(auth);
  }, []);

  const chosePage = () => {
    if (page === "home") {
      return <Home setPage={setPage} />;
    }
    if (page === "login") {
      return <Login setPage={setPage} />;
    }
    if (page === "forgot") {
      return <Forgot setPage={setPage} />;
    }
    if (page === "register") {
      return <Register setPage={setPage} />;
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
      return <Home />;
    }
  };

  return <React.Fragment>{pages()}</React.Fragment>;
}

export default App;
