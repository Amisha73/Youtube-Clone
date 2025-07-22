import React, { useState } from "react";
import logo from "../assestes/icon_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import SideNavbar from "../Component/SideNavbar";

const VideoUpload = ({sideNavbar}) => {
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoType: "",
    thumbnail: null,
    videoUrl: null,
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
    if (!inputField.title || !inputField.description || !inputField.videoType || !inputField.thumbnail || !inputField.videoUrl) {
      toast.error("Please fill all the required fields.");
      return;
    }
    setLoader(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", inputField.title);
      formData.append("description", inputField.description);
      formData.append("videoType", inputField.videoType);
      formData.append("thumbnail", inputField.thumbnail);
      formData.append("videoUrl", inputField.videoUrl);
      formData.append("channelId", channelId);

      const response = await axios.post("http://localhost:8000/videos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Video uploaded successfully!");
        // Navigate to the profile page of the channel to refresh videos
        navigate(`/user/${channelId}`);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Failed to upload video.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center font-normal bg-black ">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className="w-full max-w-md rounded-md mt-5 p-5 shadow shadow-white border mx-auto">
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
          <div className="w-[100%] text-center cursor-pointer">
            <label className="text-white">Thumbnail</label>
            <input
              type="file"
              onChange={(e) => uploadFile(e, "thumbnail")}
              accept="image/*"
              className="mt-2"
            />
          </div>
          <div className="w-[100%] text-center cursor-pointer">
            <label className="text-white">Video File</label>
            <input
              type="file"
              onChange={(e) => uploadFile(e, "videoUrl")}
              accept="video/*"
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
