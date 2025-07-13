import React, { useState } from "react";
import video from "../assestes/Video.mp4";
import profileimage from "../assestes/moana-thumbnail.jpeg";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import tseries from '../assestes/tseries.png'
import { Link } from "react-router-dom";

const Video = () => {
  const [inputField, setInputField] = useState({"comment":""})

  return (
    <div className=" mt-14 flex px-16 py-6 bg-black text-white">
      <div className="w-full max-w-4xl flex flex-col">
        {/* video section */}
        <div className="w-full">
          <video controls autoPlay className="rounded-xl">
            <source src={video} type="video/mp4" className="w-full" />
          </video>
        </div>
        {/* description  */}
        <div className="flex flex-col">
          <div className="text-lg font-semibold mt-2">{"Moana2 full Movie in Hd"}</div>

          <div className="flex justify-between mt-2">
            <Link to={"/user/1"} className="flex gap-4">
              <div className=" cursor-pointer">
                <img
                  src={profileimage}
                  alt="profile"
                  className="w-10 h-9 mt-1 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-lg">{"user 1"}</div>
                <div className="text-sm text-[#AAAA]">{"2025-07-06"}</div>
              </div>
              <div className="bg-white text-black py-4 px-4 rounded-3xl flex justify-center items-center h-9 font-semibold cursor-pointer text-sm hover:bg-gray-200">
                Subscribe
              </div>
            </Link>

            <div className="flex gap-2 bg-[#a5a4a438] justify-center items-center p-2 box-border cursor-pointer rounded-3xl">
                <div className="flex gap-2">
                    <ThumbUpOffAltIcon className="text-white"/>
                    <div className="font-semibold">{0}</div>
                </div>
                <div className="w-0 h-5 border"></div>
                <div className="flex gap-2">
                    <ThumbDownOffAltIcon className="text-white"/>
                    <div className="font-semibold">{0}</div>
                </div>
            </div>
          </div>

          <div className="flex flex-col p-2 bg-[#a5a5a538] w-full rounded-lg font-medium text-sm gap-2 mt-2 box-border">
            <div > 2025-07-09   <span className="text-gray-400">#latest #ontrending 10</span> </div>
            <div>This is full Movie </div>
          </div>
        </div>
        {/* comments section */}
        <div className="flex flex-col mt-5">
            <div className="text-lg font-medium">2 Comments</div>

            <div className="flex mt-6 gap-2">
                <img src={tseries} alt="profilecomment" className="w-8 h-7 rounded-full" />
                {/* input for comment */}
                <div className="flex flex-col w-full">
                    <input type="text" placeholder="Add a comment" value={inputField} onChange={(e)=> setInputField(e.target.value)} className="w-full bg-black text-white border-b border-gray-400 focus:outline-none placeholder:text-base"/>
                    <div className="flex justify-end gap-4 mt-2">
                        <div className="p-2 px-3 rounded-3xl font-semibold border cursor-pointer hover:bg-white hover:text-black ">Cancel</div>
                        <div className="p-2 px-3 font-semibold rounded-3xl border cursor-pointer hover:bg-white hover:text-black ">Comment</div>
                    </div>
                </div>
            </div>
            {/* Add a comment1 */}
            <div className="flex flex-col gap-3 mb-5">
                <div className="flex gap-2">
                <img src={tseries} alt="profilecomment" className="w-8 h-7 rounded-full" />
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <div className="text-sm font-medium">UserName</div>
                        <div className="text-sm text-[#AAAA]">2025-07-09</div>
                    </div>

                    <div className="mt-2">This is super movie</div>
                </div>
                </div>
            </div>
            {/* Add a comment2 */}
            <div className="flex flex-col gap-3 mb-5">
                <div className="flex gap-2">
                <img src={tseries} alt="profilecomment" className="w-8 h-7 rounded-full" />
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <div className="text-sm font-medium">UserName</div>
                        <div className="text-sm text-[#AAAA]">2025-07-09</div>
                    </div>

                    <div className="mt-2">This is super movie</div>
                </div>
                </div>
            </div>
            {/* Add a comment3 */}
            <div className="flex flex-col gap-3 mb-5">
                <div className="flex gap-2">
                <img src={tseries} alt="profilecomment" className="w-8 h-7 rounded-full" />
                <div className="flex flex-col">
                    <div className="flex gap-2">
                        <div className="text-sm font-medium">UserName</div>
                        <div className="text-sm text-[#AAAA]">2025-07-09</div>
                    </div>

                    <div className="mt-2">This is super movie</div>
                </div>
                </div>
            </div>
        </div>
      </div>

      {/* suggestion videos section */}
      <div className="flex flex-col max-w-sm w-full gap-4 text-white py-4">
        {/* sugg. video 1 */}
        <div className="flex gap-4 cursor-pointer mb-3">
            <div className="w-45 h-24">
                <img src={profileimage} alt="videothumbnail" className="" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-medium mb-1 text-sm">It's a call from the ancestors #Moana2fullmovie</div>
                <div className="text-[#ffffff9c] text-xs">User1</div>
                <div className="text-[#ffffff9c] text-xs">13k views . 1 day ago</div>
            </div>
        </div>
        {/* sugg. video 2 */}
        <div className="flex gap-4 cursor-pointer">
            <div className="w-45 h-24">
                <img src={profileimage} alt="videothumbnail" className="" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-medium mb-1 text-sm">It's a call from the ancestors #Moana2fullmovie</div>
                <div className="text-[#ffffff9c] text-xs">User1</div>
                <div className="text-[#ffffff9c] text-xs">13k views . 1 day ago</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
