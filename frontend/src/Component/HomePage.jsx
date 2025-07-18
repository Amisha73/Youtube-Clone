import React, { useState } from "react";
import { Link } from "react-router-dom";
import localVideos from '../data/localVideos';

const HomePage = ({ sideNavbar }) => {
  const [selectedOption, setSelectedOption] = useState("All");

  // Get unique video types from localVideos
  const videoTypes = Array.from(new Set(localVideos.map(video => video.videoType)));

  // Options array with "All" plus unique video types
  const options = ["All", ...videoTypes];

  // Filter videos based on selected option
  const filteredVideos = selectedOption === "All"
    ? localVideos
    : localVideos.filter(video => video.videoType === selectedOption);

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
                selectedOption === item ? "bg-white text-black" : "bg-[rgba(42,42,42)] text-white"
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
          <Link key={video.videoId} to={`/watch/${video.videoId}`} className="text-white flex box-border flex-col cursor-pointer h-80 mt-6 w-full">
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
                  src="https://i.pinimg.com/originals/2a/2d/c2/2a2dc2d48cd11f4577b4813b76445702.jpg?nii=t"
                  alt="profile"
                  className="w-12 h-10 rounded-full"
                />
              </div>

              <div className="w-full p-3 box-border flex flex-col">
                <div className="font-semibold text-md md:text-lg">{video.title}</div>
                
                <div className="flex justify-between items-center gap-4">
                  <div className=" text-md text-[rgba(170,170,170)]">
                  {video.uploader}
                </div>
                  <div className="text-sm text-gray-400">{video.views} views</div>
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
