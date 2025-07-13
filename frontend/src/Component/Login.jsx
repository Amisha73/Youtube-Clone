import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";

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
        // Optionally store user data if needed
        // localStorage.setItem("user", JSON.stringify(fullData.user));
        console.log(fullData);
        navigate("/"); // Redirect to home page
      } else {
        // Handle login failure
        setErrorMessage(fullData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen text-white flex justify-center items-center font-normal cursor-pointer">
      <div className="w-[40%] h-[50%] bg-black box-border p-12 flex flex-col items-center justify-center shadow shadow-white">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium">
          <img src={logo} alt="logo" className="w-8" />
          LogIn
        </div>

        {errorMessage && ( // Display error message if exists
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-7 w-full items-center justify-center mt-6">
          <div className="w-full flex justify-center items-center">
            <input
              type="email"
              placeholder="Email"
              value={loginField.email}
              onChange={(e) => handleOnChangeInput(e, "email")}
              className="w-[70%] h-11 text-white p-3 border-none rounded-md bg-[#222222]"
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <input
              type="password"
              placeholder="Password"
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, "password")}
              className="w-[70%] h-11 text-white p-3 border-none rounded-md bg-[#222222]"
            />
          </div>
        </div>

        <div className="w-[70%] flex justify-between mt-7">
          <div
            className="w-[25%] border h-8 font-medium flex justify-center items-center rounded-md hover:bg-white hover:text-black cursor-pointer"
            onClick={handleLogin}
          >
            Login
          </div>
          <Link
            to={"/signup"}
            className="w-[25%] font-medium border h-8 flex justify-center items-center rounded-md hover:bg-white hover:text-black"
          >
            Sign Up
          </Link>
          {/* <div className="w-[25%] border h-8 font-medium flex justify-center items-center rounded-md hover:bg-white hover:text-black">Cancel</div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
