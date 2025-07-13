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
    const file = e.target.files;
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "yputube-clone");
    try {
      const response = await axios.post(
        `http://api.cloudinary.com/v1_1/dhlklhfgj/${type}/upload`,
        data
      );
      const url = response.data.url;
      setLoader(false);
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
    <div className="flex flex-col w-full h-screen items-center justify-center font-normal bg-black p-2">
      <div className="w-full max-w-md rounded-md mt-5 p-5 shadow shadow-white border">
        <div className="flex gap-3 w-full justify-center items-center text-2xl text-white font-medium mb-4">
          <img src={logo} alt="logo" className="w-8" />
          Upload Video
        </div>

        <div className="flex flex-col gap-6 mt-7 mb-7 items-center text-white">
          <input
            type="text"
            placeholder="Title of Video"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, "title")}
            className="w-[90%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          <input
            type="text"
            placeholder="Description"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, "description")}
            className="w-[90%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          {/* <input
            type="text"
            placeholder="Video URL"
            value={inputField.videoLink}
            onChange={(e) => handleOnChangeInput(e, "videoLink")}
            className="w-[90%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          /> */}
          <div className="w-[100%] text-center">
            <label className="text-white">Thumbnail</label>
            <input
              type="file"
              onChange={(e) => uploadImage(e, "thumbnail")}
              accept="image/*"
              className="mt-2"
            />
          </div>
          <div className="w-[90%] text-center">
            <label className="text-white">Video</label>
            <input
              type="file"
              onChange={(e) => uploadImage(e, "video")}
              accept="video/mp4, video/webm, video/*"
              className="mt-2"
            />
          </div>

          {loader && (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </div>

        <div className="flex gap-7 justify-center mt-6">
          <div className="p-1 px-2 font-normal text-lg cursor-pointer text-white rounded-md border border-white hover:bg-white hover:text-black">
            Upload
          </div>
          <Link
            to={"/"}
            className="p-1 px-2 font-normal text-lg cursor-pointer text-white rounded-md border border-white hover:bg-white hover:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
