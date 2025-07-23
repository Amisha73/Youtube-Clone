import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import localVideos from "../data/localVideos";

const HomePage = ({ sideNavbar }) => {
  const [selectedOption, setSelectedOption] = useState("All");
  const [allVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get unique video types from localVideos
  const videoTypes = Array.from(
    new Set(localVideos.map((video) => video.videoType))
  );
  const uploadedvideoTypes = Array.from(
    new Set(localVideos.map((video) => video.videoType))
  );

  // Options array with "All" plus unique video types
  const options = ["All", ...videoTypes, ...uploadedvideoTypes];

  // Filter videos based on selected option
  const filteredVideos =
    selectedOption === "All"
      ? localVideos
      : localVideos.filter((video) => video.videoType === selectedOption);

  useEffect(() => {
    const fetchAllVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/videos/getvideos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setAllVideos(data || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchAllVideos();
  }, []);

  const uploadedFilteredVideos =
    selectedOption === "All"
      ? allVideos
      : allVideos.filter((video) => video.videoType === selectedOption);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 seconds loading

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div class="loader flex justify-center items-center mx-auto h-screen"></div>
    );
  }

  return (
    <div
      className={
        "flex flex-col overflow-x-hidden flex-1 w-full min-h-screen no-scrollbar"
      }
    >
      {/* filter section */}
      <div className="flex fixed top-14 p-2 px-5 z-[1] w-full box-border gap-2 flex-shrink-0 h-auto bg-black overflow-x-auto no-scrollbar">
        {options.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => setSelectedOption(item)}
              className={`flex h-7 px-3 py-4 rounded-md justify-center items-center cursor-pointer flex-shrink-0 font-semibold text-sm ${
                selectedOption === item
                  ? "bg-white text-black"
                  : "bg-[rgba(42,42,42)] text-white"
              }`}
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* video section  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-32 pb-5 px-5 bg-black box-border ">
        {filteredVideos.map((video) => (
          <Link
            key={video.videoId}
            to={`/localdata/video/watch/${video.videoId}`}
            className="text-white flex box-border flex-col cursor-pointer h-80 mt-6 w-full"
          >
            <div className="w-full relative box-border h-[216px]">
              <img
                src={video.thumbnailUrl}
                alt="thumbnail"
                className="w-full h-full rounded-xl"
              />
              <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
                {video.videoLength}
              </div>
            </div>

            <div className="flex pt-2">
              <div>
                <img
                  src={video.pp || "https://via.placeholder.com/150"}
                  alt="profile"
                  className="w-12 h-10 rounded-full"
                />
              </div>

              <div className="w-full p-3 box-border flex flex-col">
                <div className="font-semibold text-md md:text-lg">
                  {video.title}
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className=" text-md text-[rgba(170,170,170)]">
                    {video.uploader}
                  </div>
                  <div className="text-sm text-gray-400">
                    {video.views} views
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* videos which is uploaded show here also */}
        {uploadedFilteredVideos.map((video) => (
          <Link
            key={video._id}
            to={`/watch/${video._id}`}
            className="text-white flex box-border flex-col cursor-pointer h-80 mt-6 w-full"
          >
            <div className="w-full relative box-border h-[216px]">
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="w-full h-full rounded-xl"
              />
            </div>

            <div className="flex pt-2">
              <div>
                <img
                  src={
                    video.channelId?.profilePicture ||
                    "https://via.placeholder.com/150"
                  }
                  alt="profile"
                  className="w-12 h-10 rounded-full"
                />
              </div>

              <div className="w-full p-3 box-border flex flex-col">
                <div className="font-semibold text-md md:text-lg">
                  {video.title}
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className=" text-md text-[rgba(170,170,170)]">
                    {video.channelId?.channelName}
                  </div>
                  <div className="text-sm text-gray-400">
                    {video.views} views
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
