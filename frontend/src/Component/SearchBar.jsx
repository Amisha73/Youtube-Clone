import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

const SearchBar = ({ showSearchBar, toggleSearchBar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

const handleSearch = () => {
  if (searchQuery.trim() === "") return;
  // Navigate to search results page
  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  setSearchQuery(""); // Clear input after search
};


  return (
    <div className="flex items-center gap-2 flex-grow max-w-xl mx-4">
      {showSearchBar ? (
        <div className="flex w-full absolute left-0 top-14 bg-black p-2 md:relative md:top-0 md:bg-transparent rounded-full border border-gray-700">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full h-10 rounded-l-full bg-[#121212] text-white text-base pl-4 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            className="bg-gray-600 w-14 rounded-r-full flex justify-center items-center hover:bg-gray-700"
            onClick={handleSearch}
          >
            <SearchIcon className="text-white" />
          </button>
        </div>
      ) : (
        <div className="hidden sm:flex w-full">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full h-10 rounded-l-full border border-gray-600 bg-[#121212] text-white text-base pl-7 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div
            className="flex justify-center items-center bg-gray-600 w-14 rounded-r-full cursor-pointer border-gray-600 hover:bg-gray-700"
            onClick={handleSearch}
          >
            <SearchIcon className="text-white text-lg" />
          </div>
          <div className="flex justify-center items-center bg-gray-600 rounded-full w-12 h-10 ml-3 cursor-pointer hover:bg-gray-700">
            <KeyboardVoiceIcon className="text-white" />
          </div>
        </div>
      )}
      <button
        className="sm:hidden bg-gray-600 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-700"
        onClick={toggleSearchBar}
      >
        <SearchIcon className="text-white" />
      </button>
    </div>
  );
};

export default SearchBar
