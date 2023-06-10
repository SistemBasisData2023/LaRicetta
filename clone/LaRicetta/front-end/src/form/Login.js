/* eslint-disable default-case */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logopng.png"
import axios from "axios";
import { toast } from "react-toastify";

export default function Login(props) {
  return (
    <React.Fragment>
      <div>
        <img src={logo} className="w-20 mx-auto" alt="Logopng" />
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          Welcome to Ricetta
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
          Please login to your account!
        </p>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none focus:ring focus:outline-none"
        />
      </div>
      <div className="text-center mt-6">
        <button
          type="submit"
          className="py-3 w-64 text-xl text-white bg-red-700 rounded-2xl hover:bg-red-700 active:bg-red-700 outline-non"
        >
          <Link
            to="/user/home"
            onClick={() => {
              props.setPage("home");
            }}
          >
            <span>Sign In</span>
          </Link>
        </button>
        <p className="mt-4 text-sm">
          You don't have an account?{" "}
          <Link
            to="/register"
            onClick={() => {
              props.setPage("register");
            }}
          >
            <span className="underline cursor-pointer">Register</span>
          </Link>{" "}
          or{" "}
          <Link
            to="/forgot"
            onClick={() => {
              props.setPage("forgot");
            }}
          >
            <span className="underline cursor-pointer">Forgot Password?</span>
          </Link>
        </p>
      </div>
    </React.Fragment>
  );
}
