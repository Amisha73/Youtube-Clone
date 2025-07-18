import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  async function handleLogin() {
    const object = {
      method: "POST",
      body: JSON.stringify({
        email: loginField.email,
        password: loginField.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch("http://localhost:8000/auth/login", object);
      const fullData = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", fullData.token);
        toast.success("User  logged in successfully!"); // Show success toast
        navigate("/"); // Redirect to home page
      } else {
        // Handle login failure
        setErrorMessage(fullData.message || "Login failed. Please try again.");
        toast.error(fullData.message || "Login failed. Please try again."); // Show error toast
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again."); // Show error toast
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white p-3 ">
      <div className="w-full max-w-md bg-black p-6 md:p-8 rounded-lg border shadow flex flex-col items-center shadow-white">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium mb-4">
          <img src={logo} alt="logo" className="w-8" />
          LogIn
        </div>

        {errorMessage && ( // Display error message if exists
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-4 w-full mt-6">
          <input
            type="email"
            placeholder="Email"
            value={loginField.email}
            onChange={(e) => handleOnChangeInput(e, "email")}
            className="w-full h-11 text-white p-3 border-none rounded-md bg-[#222222] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={loginField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
            className="w-full h-11 text-white p-3 border-none rounded-md bg-[#222222] focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-between mt-6">
          <div
            className="w-[48%] border h-10 font-medium flex justify-center items-center rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </div>
          <Link
            to={"/signup"}
            className="w-[48%] font-medium border h-10 flex justify-center items-center rounded-md hover:bg-white hover:text-black"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
