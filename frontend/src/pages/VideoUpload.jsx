import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    video: "",
  });
  const [loader, setLoader] = useState(false);
  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadImage = async (e, type) => {
    setLoader(true);
    // console.log("uploading....");
    const file = e.target.files;
    const data = new FormData();
    data.append("file", file[0]);
    // youtube-clone file
    data.append("upload_preset", "yputube-clone");
    try {
      const response = await axios.post(
        `http://api.cloudinary.com/v1_1/dhlklhfgj/${type}/upload`,
        data
      );
      // console.log(response);
      const url = response.data.url;
      setLoader(false);
      // console.log(url);
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col pt-16 w-full h-screen items-center justify-center font-normal bg-black">
      <div className="w-[45%] rounded-md mt-5 p-5 shadow shadow-white">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium">
          <img src={logo} alt="logo" className=" w-8" />
          Upload Video
        </div>

        <div className="flex flex-col gap-6 mt-7 mb-7 items-center text-white">
          <input
            type="text"
            placeholder="Title of Video"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
            className="w-[70%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
            className="w-[70%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          <input
            type="text"
            placeholder="Link"
            value={inputField.videoLink}
            onChange={(e) => handleOnChangeInput(e, "videoLink")}
            className="w-[70%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          <div>
            Thumbnail{" "}
            <input
              type="file"
              value={inputField.thumbnail}
              onChange={(e) => uploadImage(e, "thumbnail")}
              accept="image/*"
            />
          </div>
          <div>
            Video{" "}
            <input
              type="file"
              value={inputField.video}
              onChange={(e) => uploadImage(e, "video")}
              accept="video/mp4, video/webm, video/*"
            />
          </div>

          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className="flex gap-7 justify-center mt-6">
          <div className="p-1 px-2 font-normal text-lg cursor-pointer text-white rounded-md border border-white hover:bg-white hover:text-black ">
            Upload
          </div>
          <Link
            to={"/"}
            className="p-1 px-2 font-normal text-lg cursor-pointer text-white rounded-md border border-white hover:bg-white hover:text-black "
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
