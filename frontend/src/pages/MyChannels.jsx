import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import SideNavbar from "../Component/SideNavbar";

const MyChannels = ({ sideNavbar }) => {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchChannels = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:8000/channels/getchannel",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setChannels(response.data.channels);
        } else {
          setError("Failed to fetch channels");
        }
      } catch (err) {
        setError("Error fetching channels");
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, [navigate]);

  const handleViewChannel = (channelId) => {
    // Redirect to Profile page with channel ID
    navigate(`/user/${channelId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-black text-white min-h-screen py-80  text-xl ">
        Loading channels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center  bg-black min-h-screen py-80  text-xl ">
        {error}
      </div>
    );
  }

  if (channels.length === 0) {
    return (
      <div className="flex flex-col text-center gap-8 bg-black min-h-screen text-white py-32">
        <SideNavbar sideNavbar={sideNavbar} />
        <span className=" text-xl">No channel found.</span>{" "}
        <Link
          to={"/"}
          className="bg-white text-black font-semibold hover:bg-gray-100 p-2 rounded-lg w-fit mx-auto"
        >
          Create Channel
        </Link>
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className="flex-grow p-4">
        <h1 className="text-3xl md:text-4xl font-semibold mt-14 p-4 text-white text-center">
          My Channels
        </h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {channels.map((channel) => (
            <div
              key={channel._id}
              className="flex flex-col items-center bg-gray-800 rounded-lg p-4 w-60 shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  channel.profilePicture || "https://via.placeholder.com/150"
                }
                alt={channel.channelName}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h2 className="text-lg font-medium text-white mb-2 text-center">
                {channel.channelName}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewChannel(channel._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteChannel(channel._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  async function handleDeleteChannel(channelId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this channel?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a channel.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:8000/channels/deletechannel/${channelId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setChannels((prevChannels) =>
          prevChannels.filter((channel) => channel._id !== channelId)
        );
      } else {
        alert("Failed to delete channel.");
      }
    } catch (error) {
      alert("Error deleting channel.");
    }
  }
};

export default MyChannels;
