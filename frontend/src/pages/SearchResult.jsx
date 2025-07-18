import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import localVideos from "../data/localVideos";
// import SideNavbar from "../Component/SideNavbar";

/**
 * SearchResults Component ----- This component displays videos that match a search query from the URL.
 * It reads the search query from the URL, filters videos accordingly, and displays them.
 */
const SearchResult = ({sideNavbar}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      const filteredVideos = localVideos.filter((video) =>
        video.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredVideos);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleThumbnailClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  return (
    <div className={`px-8 py-4 bg-black text-white min-h-screen `}>
      {/* <SideNavbar sideNavbar={sideNavbar} /> */}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-14 ">
          {results.map((video) => (
            <div
              key={video.videoId}
              className="cursor-pointer"
              onClick={() => handleThumbnailClick(video.videoId)}
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-auto rounded-lg mb-2 hover:opacity-90 transition-opacity duration-200"
              />
              <h3 className="text-lg font-semibold truncate">{video.title}</h3>
              <div className="flex  gap-40">
                <p className="text-base text-gray-400 truncate">{video.uploader}</p>
              <p className="text-sm text-gray-500">{video.views} views</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-400 py-20 px-4">No videos found.</p>
      )}
    </div>
  );
};

export default SearchResult;
