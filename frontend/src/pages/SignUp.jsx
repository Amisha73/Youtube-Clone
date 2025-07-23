import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 
import SideNavbar from "../Component/SideNavbar";

const SignUp = ({sideNavbar}) => {
  
  const [signUpField, setSignUpField] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  async function handleRegister() {
    const formData = new FormData();
    formData.append("username", signUpField.username);
    formData.append("email", signUpField.email);
    formData.append("password", signUpField.password);

    const object = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch("http://localhost:8000/auth/register", object);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const fullData = await response.json();
      console.log(fullData);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  }

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen w-full bg-black p-3">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className="w-full h-auto max-w-md border mt-7 p-4 md:p-8 flex flex-col items-center justify-center shadow shadow-white">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium mt-4 mb-4">
          <img src={logo} alt="logo" className="w-8" />
          Sign Up
        </div>

        {errorMessage && ( 
          <div className="text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}

        <div className="flex justify-center items-center flex-col mt-4 gap-5 w-full">
          <input
            type="text"
            placeholder="Username"
            value={signUpField.username}
            onChange={(e) => handleOnChangeInput(e, "username")}
            className="w-[70%] h-11 text-white p-2 border-none rounded-md bg-[#222222] focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpField.email}
            onChange={(e) => handleOnChangeInput(e, "email")}
            className="w-[70%] h-11 text-white p-2 border-none rounded-md bg-[#222222] focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={signUpField.password}
            onChange={(e) => handleOnChangeInput(e, "password")}
            className="w-[70%] h-11 text-white p-2 border-none rounded-md bg-[#222222] focus:outline-none"
          />

          <div className="w-full flex items-center justify-center gap-4 mt-6">
            <div
              className="w-[48%] border h-10 flex justify-center font-medium items-center rounded-md hover:bg-white hover:text-black cursor-pointer"
              onClick={handleRegister}
            >
              Sign Up
            </div>
            <Link
              to={"/"}
              className="w-[48%] border h-10 flex justify-center font-medium items-center rounded-md hover:bg-white hover:text-black cursor-pointer"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
