import React from "react";
import moanathumbnail from '../assestes/moana-thumbnail.jpeg'
import { Link } from "react-router-dom";

const HomePage = ({ sideNavbar }) => {
  const options = [
    "All", "Music", "Gaming",  "Recruitment",  "News",  "Data Structure",  "Pakistani Dramas",  "Comedy", "Anime", "Indian serials",
    "Ghazal", "Live", "Comedy","Anime", "Indian serials","Ghazal", "Live", "Recently upload", "New to you",
  ];

  return (
    <div
      className={
        sideNavbar
          ? "flex flex-col overflow-x-hidden flex-1 ml-[244px] min-h-screen"
          : "flex flex-col overflow-x-hidden flex-1 w-full min-h-screen"
      }
    >
      {/* filter section */}
      <div className="flex fixed top-14 p-2 px-5 z-[1] w-full box-border gap-2 flex-shrink-0 h-auto bg-black overflow-x-auto no-scrollbar">
        {options.map((item, index) => {
          return (
            <div
              key={index}
              className="flex h-7 px-3 py-4 bg-[rgba(42,42,42)] text-white font-semibold rounded-md justify-center items-center cursor-pointer flex-shrink-0"
            >
              {item}
            </div>
          );
        })}
      </div>

      {/* video section  */}
      <div className={sideNavbar ? "grid box-border gap-3 grid-cols-3 pt-32 pb-5 px-5 bg-black" : "grid grid-cols-4 gap-3 pt-32 pb-5 px-5 bg-black box-border"} >
        <Link to={"/watch/123"} className="text-white flex box-border flex-col cursor-pointer h-80">
          <div className="w-full relative box-border h-[216px]">
            <img
              src="https://i.ytimg.com/vi/lU-csIO1x0E/hq720.jpg?sqp=-%E2%80%A6BACGAY4AUAB&rs=AOn4CLA15CyTlnyhZI_iOzwfSq4EReX7zA"
              alt="thumbnail"
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
              28:05
            </div>
          </div>

          <div className="flex pt-2">
            <div>
              <img
                src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"
                alt="profile"
                className="w-12 h-10 rounded-full"
              />
            </div>

            <div className="w-full p-3 box-border flex flex-col">
              <div className="font-semibold text-xl">video title</div>
              <div className="mt-1 text-md text-[rgba(170,170,170)]">
                User channel name
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">124 views</div>
                <div className="text-sm text-gray-400">4 days ago</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/watch/123"} className="text-white flex box-border flex-col cursor-pointer h-80">
          <div className="w-full relative box-border h-[216px]">
            <img
              src={moanathumbnail}
              alt="thumbnail"
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
              28:05
            </div>
          </div>

          <div className="flex pt-2">
            <div>
              <img
                src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"
                alt="profile"
                className="w-12 h-10 rounded-full"
              />
            </div>

            <div className="w-full p-3 box-border flex flex-col">
              <div className="font-semibold text-xl">video title</div>
              <div className="mt-1 text-md text-[rgba(170,170,170)]">
                User channel name
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">124 views</div>
                <div className="text-sm text-gray-400">4 days ago</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/watch/123"} className="text-white flex box-border flex-col cursor-pointer h-80">
          <div className="w-full relative box-border h-[216px]">
            <img
              src={moanathumbnail}
              alt="thumbnail"
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
              28:05
            </div>
          </div>

          <div className="flex pt-2">
            <div>
              <img
                src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"
                alt="profile"
                className="w-12 h-10 rounded-full"
              />
            </div>

            <div className="w-full p-3 box-border flex flex-col">
              <div className="font-semibold text-xl">video title</div>
              <div className="mt-1 text-md text-[rgba(170,170,170)]">
                User channel name
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">124 views</div>
                <div className="text-sm text-gray-400">4 days ago</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/watch/123"} className="text-white flex box-border flex-col cursor-pointer h-80">
          <div className="w-full relative box-border h-[216px]">
            <img
              src={moanathumbnail}
              alt="thumbnail"
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
              28:05
            </div>
          </div>

          <div className="flex pt-2">
            <div>
              <img
                src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"
                alt="profile"
                className="w-12 h-10 rounded-full"
              />
            </div>

            <div className="w-full p-3 box-border flex flex-col">
              <div className="font-semibold text-xl">video title</div>
              <div className="mt-1 text-md text-[rgba(170,170,170)]">
                User channel name
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">124 views</div>
                <div className="text-sm text-gray-400">4 days ago</div>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/watch/123"} className="text-white flex box-border flex-col cursor-pointer h-80">
          <div className="w-full relative box-border h-[216px]">
            <img
              src={moanathumbnail}
              alt="thumbnail"
              className="w-full h-full rounded-xl"
            />
            <div className="absolute bottom-1 right-1 w-auto px-1 py-1 bg-[rgba(42,42,42)] rounded-md">
              28:05
            </div>
          </div>

          <div className="flex pt-2">
            <div>
              <img
                src="https://yt3.ggpht.com/Y_G09q2it3FZMrbbxwLjgMjSanR1mZAsXnEE6g6ZaBXlq2dLIRsKqSrGTCMuiyvvVavu-xFvPEc=s68-c-k-c0x00ffffff-no-rj"
                alt="profile"
                className="w-12 h-10 rounded-full"
              />
            </div>

            <div className="w-full p-3 box-border flex flex-col">
              <div className="font-semibold text-xl">video title</div>
              <div className="mt-1 text-md text-[rgba(170,170,170)]">
                User channel name
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">124 views</div>
                <div className="text-sm text-gray-400">4 days ago</div>
              </div>
            </div>
          </div>
        </Link>
        
      </div>
    </div>
  );
};

export default HomePage;
