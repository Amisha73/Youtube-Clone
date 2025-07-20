import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assestes/icon_logo.png";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import CreateChannel from "./CreateChannel";
import { toast } from "react-toastify"; 
import SearchBar from "./SearchBar";

const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
  const [userProfilePic, setUserProfilePic] = useState(
    "https://www.gstatic.com/youtube/img/account/user_default_32.png"
  );
  const [option, setOption] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

   const sideNavbarFunc = () => {
    setSideNavbarFunc(!sideNavbar);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetch("http://localhost:8000/channels/getchannel", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (res.status === 401) {
            toast.error("Token expired, please login again.");
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUserProfilePic("https://www.gstatic.com/youtube/img/account/user_default_32.png");
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.count && data.count > 0) {
            setHasChannel(true);
            setChannelId(data.channels[0]._id);
            if (data.channels[0].profilePicture) {
              setUserProfilePic(data.channels[0].profilePicture);
            }
          } else {
            setHasChannel(false);
          }
        })
        .catch((err) => {
          console.error("Error fetching channel info:", err);
        });
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickProfile = () => {
    setOption((prev) => !prev);
  };

 

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleMyChannel = () => {
    if (!hasChannel) {
      openCreateChannel();
      setOption(false);
      return;
    }
    navigate("/user/mychannel");
    setOption(false);
  };

  async function handleLogout() {
    setOption(false);
    try {
      const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserProfilePic("https://www.gstatic.com/youtube/img/account/user_default_32.png");
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  const openCreateChannel = () => {
    setShowCreateChannel(true);
  };

  return (
    <div>
      <div className="navbar h-14 w-full px-6 py-4 flex justify-between items-center top-0 fixed bg-black z-10">
        {/* Left side */}
        <div className="flex items-center gap-2 md:gap-4">
         <MenuIcon
          className="text-white cursor-pointer md:hidden"
          onClick={sideNavbarFunc}
        />
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-9" />
            <span className="text-xl text-white font-mono font-semibold hidden md:block">
              YouTube
            </span>
          </Link>
        </div>

        {/* Middle - Search */}
        <SearchBar showSearchBar={showSearchBar} toggleSearchBar={toggleSearchBar} />

        {/* Right side */}
        <div className="navbar-right flex gap-2 sm:gap-5 justify-center items-center relative">
          {isLoggedIn ? (
            <>
              <Link
                to={hasChannel ? "/763/upload" : "#"}
                onClick={(e) => {
                  if (!hasChannel) {
                    e.preventDefault();
                    toast.error("No channel found. Please create a channel first.");
                  }
                }}
              >
                <VideoCallIcon className="text-3xl cursor-pointer text-white" />
              </Link>
              <NotificationsIcon className="text-white text-3xl cursor-pointer" />
              <div className="relative" ref={dropdownRef}>
                <img
                  src={userProfilePic}
                  alt="ProfilePic"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={handleClickProfile}
                />
                {option && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 text-black">
                    <div
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={handleMyChannel}
                    >
                      Create Channel
                    </div>
                    {
                      hasChannel ? (
                        <div
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => navigate(channelId ? `/user/${channelId}` : "/")}
                        >
                          My profile
                        </div>
                      ) : (
                        null
                      )
                    }
                    <div
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to={"/login"}
              className="bg-white text-black py-2 px-4 rounded-3xl flex justify-center items-center h-9 cursor-pointer text-sm hover:bg-gray-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      {showCreateChannel && (
        <CreateChannel
          onClose={() => setShowCreateChannel(false)}
          onChannelCreated={(channel) => {
            setHasChannel(true);
            setUserProfilePic(channel.profilePicture);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
