import React, { useState, useEffect } from 'react'
import SideNavbar from '../Component/SideNavbar'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Link, useParams } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from "react-toastify"; 

const Profile = ({sideNavbar}) => {
  const { id } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/channels/getchannel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch channel data");
        }
        const data = await response.json();
        setChannelData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/videos/channel/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data || []);
      } catch (err) {
        console.error("Error fetching videos:", err);
      }
    };

    fetchChannelData();
    fetchVideos();
  }, [id]);

  const toggleDropdown = (videoId) => {
    if (openDropdownId === videoId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(videoId);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/videos/${videoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete video");
      }
      // Remove deleted video from state to update UI
      setVideos((prevVideos) => prevVideos.filter((video) => video._id !== videoId));
      toast.success("Video deleted successfully");
      setOpenDropdownId(null);
    } catch (error) {
      toast.error("Error deleting video: " + error.message);
      setOpenDropdownId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center bg-black text-white min-h-screen py-80  text-xl">Loading channel data...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center  bg-black min-h-screen py-80  text-xl">Error: {error}</div>
  }

  if (!channelData) {
    return <div className="text-white flex justify-center items-center min-h-screen">No channel data found.</div>
  }

  return (
    <div className='flex flex-col md:flex-row w-full h-full pb-5 px-5 sm:px-10 bg-black text-white min-h-screen'>
      <SideNavbar sideNavbar={sideNavbar} />

      <div className='flex flex-col overflow-x-hidden flex-1 text-white mt-14 justify-center items-center '>
        <div className='w-full'>
          <img src={channelData.channelBanner || ""} alt="channel banner" className='w-full h-36 mb-4 ' />
        </div>
        {/* user channel upper section */}
        <div className='w-full flex flex-col md:flex-row'>
          <div className='w-full md:w-[15%] flex justify-center md:justify-start mb-4 md:mb-0 items-center object-cover'>
            <img src={channelData.profilePicture || ""} alt="profile" className= 'w-48 h-48 rounded-full object-cover' />
          </div>

          <div className='flex flex-col gap-2 py-2 px-4 w-full md:w-[85%]'>
            <div className='text-[33px] font-semibold'>{channelData.channelName || "Channel Name"}</div>
            <div className='text-base text-[rgba(153,153,153)]'>{channelData.videos ? channelData.videos.length : 0} videos</div>
            <div className='text-base text-[rgba(153,153,153)]'>{channelData.description || "About Section of channel"}</div>
            <div className="bg-white text-black w-fit py-4 px-4 rounded-3xl flex justify-center items-center h-9 font-semibold cursor-pointer text-sm hover:bg-gray-200">
              Subscribe
            </div>
          </div>
        </div>

        {/* user channel video section */}
        <div className='w-full mt-8'>
          <div className='text-xl text-gray-100 pb-2 font-medium flex items-center border-b border-[rgba(153,153,153)]'>Videos &nbsp; <ArrowRightIcon /></div>

          <div className='flex gap-6 flex-wrap mt-5 no-scrollbar overflow-x-auto'>
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div className='w-64 cursor-pointer ' key={`${video._id}`} >
                <Link to={`/watch/${video._id}`} >
                <div className='w-full h-40 object-cover relative '>
                  <img src={video.thumbnail || ""} alt={video.title} className='w-full h-full ' />
                </div>
                </Link>

               <div className='flex flex-col w-full  text-white' >
                <div className='flex flex-col mt-2 '>
                 <div className='flex flex-col w-full'>
                  <div className='text-base text-gray-100 font-medium'>{video.title}</div>
                  <div className='text-base text-[rgba(153,153,153)]'>{video.description}</div>
                  <div className='text-xs text-gray-400'>Created at {new Date(video.createdAt).toLocaleDateString()}</div>
                </div>
                <div className='relative'>
                  <MoreVertIcon
                    className='absolute -mt-16  right-1 text-gray-400 cursor-pointer hover:text-white'
                    onClick={() => toggleDropdown(video._id)}
                  />
                  {openDropdownId === video._id && (
                    <div className='absolute right-0 -mt-10 w-24 bg-gray-300 border border-gray-600 rounded-md shadow-lg z-10'>
                      <button
                        className='w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-200 rounded-md'
                        onClick={() => handleDelete(video._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
               </div>
               </div>
              </div>
              
            ))
          ) : (
            <div>No videos available.</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
