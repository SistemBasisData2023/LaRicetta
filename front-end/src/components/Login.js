/* eslint-disable default-case */
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "./assets/Logopng.png"
import bg from "./assets/BG1.png"

export default function Login() {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/home");
    };

    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
        >
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <img src={logo} className="w-20 mx-auto" alt="Logopng" />
                <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
                    Welcome to Ricetta
                </h1>
                <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer mx-auto">
                    Please login to your account!
                </p>
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
                        onClick={handleHome}
                        type="submit"
                        className="py-3 w-64 text-xl text-white bg-red-700 rounded-2xl hover:bg-red-700 active:bg-red-700 outline-non"
                    >
                        <span>Sign In</span>
                    </button>
                    <p className="mt-4 text-sm">
                        You don't have an account?{" "}
                        <Link to="/register">
                            <span className="underline cursor-pointer">Register</span>
                        </Link>{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}
