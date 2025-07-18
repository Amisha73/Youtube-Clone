import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const VideoUpload = ({sideNavbar}) => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoType: "",
    thumbnail: null,
    video: null,
  });
  const [loader, setLoader] = useState(false);
  const [channelId, setChannelId] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserChannel = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/channels/getchannel", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.channels && response.data.channels.length > 0) {
          setChannelId(response.data.channels[0]._id);
        }
      } catch (error) {
        console.error("Error fetching user channel:", error);
      }
    };
    fetchUserChannel();
  }, []);

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadFile = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      setInputField((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const handleUpload = async () => {
    if (!inputField.title || !inputField.description || !inputField.videoType || !inputField.video || !inputField.thumbnail) {
      alert("Please fill all fields and select files.");
      return;
    }
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", inputField.title);
      formData.append("description", inputField.description);
      formData.append("videoType", inputField.videoType);
      formData.append("video", inputField.video);
      formData.append("image", inputField.thumbnail);
      // Assuming channelId is stored in localStorage or can be fetched
      formData.append("channelId", channelId);

      const response = await axios.post("http://localhost:8000/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Video uploaded successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center font-normal bg-black p-2 ">
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
          <input
            type="text"
            placeholder="Video Type (e.g., tutorial, vlog)"
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, "videoType")}
            className="w-[90%] h-10 p-4 rounded-md text-white bg-[#222222] border-none text-base"
          />
          <div className="w-[100%] text-center">
            <label className="text-white">Thumbnail</label>
            <input
              type="file"
              onChange={(e) => uploadFile(e, "thumbnail")}
              accept="image/*"
              className="mt-2"
            />
          </div>
          <div className="w-[90%] text-center">
            <label className="text-white">Video</label>
            <input
              type="file"
              onChange={(e) => uploadFile(e, "video")}
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
          <div
            className="p-1 px-2 font-normal text-lg cursor-pointer text-white rounded-md border border-white hover:bg-white hover:text-black"
            onClick={handleUpload}
          >
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
