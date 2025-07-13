import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assestes/icon_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userProfilePic, setUserProfilePic] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT00veDW-SlpBDqu7izpkCncMtChzPsamUqwA&s"
  );
  const [option, setOption] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking for a token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
  }, []);

  const handleClickProfile = () => {
    setOption((prev) => !prev);
  };

  const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleProfile = () => {
    navigate("/user/1");
    setOption(false);
  };

  async function handleLogout() {
    setOption(false);
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "same-origin", // Include cookies in the request
      });
      const data = await response.json();
      if (data.success) {
        console.log(data.message); // Handle successful logout
        // Remove token from localStorage
        localStorage.removeItem("token");
        setIsLoggedIn(false); // Update login status
        navigate("/");
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <div className="navbar h-14 w-full px-6 py-4 flex justify-between items-center top-0 fixed bg-black z-10">
      {/* navbar left side */}
      <div className="flex items-center gap-4">
        <MenuIcon
          className="text-white cursor-pointer md:hidden"
          onClick={sideNavbarFunc}
        />
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8" />
          <span className="text-xl text-white font-mono font-semibold hidden md:block">
            YouTube
          </span>
        </Link>
      </div>
      {/* navbar middle  */}
      <div className="flex items-center gap-2">
        {showSearchBar ? (
          <div className="flex w-full absolute left-0 top-14 bg-black p-2 md:relative md:top-0 md:bg-transparent">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 rounded-l-full border border-gray-600 bg-[#121212] text-white text-base pl-4 focus:outline-none"
              />
              <button className="bg-gray-600 w-14 rounded-r-full flex justify-center items-center hover:bg-gray-700">
                <SearchIcon className="text-white" />
              </button>
            </div>
          </div>
        ) : (
          // only show when width is above small otherwise hidden
          <div className="sm:flex gap-3 hidden ">
            <div className=" flex ">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 rounded-l-full border border-gray-600 bg-[#121212] text-white text-base pl-7 focus:outline-none"
              />
              <div className="flex justify-center items-center bg-gray-600 w-14 rounded-r-full cursor-pointer border-gray-600 hover:bg-gray-700 ">
                <SearchIcon className="text-white text-lg" />
              </div>
            </div>
            <div className="flex justify-center items-center bg-gray-600 rounded-full w-10 h-10 cursor-pointer hover:bg-gray-700">
              <KeyboardVoiceIcon className="text-white" />
            </div>
          </div>
        )}{" "}
      </div>

      {/* navbar right side */}
      <div className="navbar-right flex gap-5 justify-center items-center relative">
        {isLoggedIn ? (
          <>
            <Link to={"/763/upload"}>
              <VideoCallIcon className="text-3xl cursor-pointer text-white" />
            </Link>
            <NotificationsIcon className="text-white text-3xl cursor-pointer" />
            <img
              src={userProfilePic}
              alt="ProfilePic"
              className="w-7 rounded-full cursor-pointer"
              onClick={handleClickProfile}
            />

            {option && ( // Conditional rendering based on click on userprofile
              <div className="absolute top-9 w-full z-20 text-white">
                <div
                  className="bg-gray-500 p-2 cursor-pointer hover:bg-gray-700"
                  onClick={handleProfile}
                >
                  Profile
                </div>
                <div
                  className="bg-gray-500 p-2 cursor-pointer hover:bg-gray-700"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <button
              className="bg-gray-600 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-700 sm:hidden"
              onClick={toggleSearchBar}
            >
              <SearchIcon className="text-white" />
            </button>
            <Link
              to={"/login"}
              className="bg-white text-black py-2 px-4 rounded-3xl flex justify-center items-center h-9 cursor-pointer text-sm hover:bg-gray-200"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
