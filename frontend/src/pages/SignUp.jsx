import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [uploadImageUrl, setUploadImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00veDW-SlpBDqu7izpkCncMtChzPsamUqwA&s"
  );
  const [signUpField, setSignUpField] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value,
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    setSignUpField({ ...signUpField, profilePicture: file });
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  async function handleRegister() {
  const formData = new FormData();
  formData.append("username", signUpField.username);
  formData.append("email", signUpField.email);
  formData.append("password", signUpField.password);
  if (signUpField.profilePicture) {
    formData.append("profilePicture", signUpField.profilePicture);
  }

  const object = {
    method: "POST",
    body: formData,
    // Remove the Content-Type header
  };

  try {
    const response = await fetch("http://localhost:8000/auth/register", object);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const fullData = await response.json();
    console.log(fullData);
    navigate("/login");
  } catch (error) {
    console.error("Error during registration:", error);
  }
}


  return (
    <div className="text-white flex flex-col items-center justify-center h-screen w-full bg-black p-3">
      <div className="w-full h-auto max-w-md border mt-7 p-4 md:p-8 flex flex-col items-center justify-center shadow shadow-white">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium mt-4 mb-4">
          <img src={logo} alt="logo" className="w-8" />
          Sign Up
        </div>

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

          <div className="flex flex-col items-center w-full">
            <input type="file" className="mb-2" onChange={uploadImage} />
            <div className="w-24 h-24">
              <img
                src={uploadImageUrl}
                alt="profilepic"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>

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
