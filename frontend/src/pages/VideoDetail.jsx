import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import SideNavbar from "../Component/SideNavbar";

const VideoDetail = ({ sideNavbar }) => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [inputField, setInputField] = useState({ comment: "" });
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:8000/videos/getvideo/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }
        const data = await response.json();
        setVideo(data);
        setComments(data.comments || []);
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        setLiked(data.likedBy.includes(userId));
        setDisliked(data.dislikedBy.includes(userId));
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [id]);

  const handleCommentChange = (e) => {
    setInputField({ comment: e.target.value });
  };

  const handleCommentSubmit = async () => {
    if (!inputField.comment.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/videos/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: inputField.comment }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const updatedVideo = await response.json();
      setComments(updatedVideo.comments);
      setInputField({ comment: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/videos/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to like video");
      }
      const updatedVideo = await response.json();
      setVideo(updatedVideo);
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      setLiked(updatedVideo.likedBy.includes(userId));
      setDisliked(updatedVideo.dislikedBy.includes(userId));
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8000/videos/${id}/dislike`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to dislike video");
      }
      const updatedVideo = await response.json();
      setVideo(updatedVideo);
      const userId = JSON.parse(atob(token.split(".")[1])).id;
      setLiked(updatedVideo.likedBy.includes(userId));
      setDisliked(updatedVideo.dislikedBy.includes(userId));
    } catch (error) {
      console.error("Error disliking video:", error);
    }
  };

  if (!video) {
    return (
      <div className="text-white flex justify-center items-center h-screen bg-black">
        Video not found
      </div>
    );
  }

  return (
    <div className="mt-14 px-4 sm:px-8 md:px-16 py-6 bg-black text-white flex flex-col lg:flex-row gap-8 ">
      <SideNavbar sideNavbar={sideNavbar} />
      <div className="flex flex-col w-full lg:w-3/4 max-w-4xl">
        {/* Video Section */}
        <div className="w-full">
          <video
            controls
            autoPlay
            className="rounded-xl w-full max-h-[480px] sm:max-h-[600px] object-contain"
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
        {/* Description */}
        <div className="flex flex-col mt-4">
          <div className="text-xl font-semibold">{video.title}</div>
          <div className="flex justify-between mt-3 flex-wrap gap-4">
            <Link
              to={`/user/${video.user?._id}`}
              className="flex gap-4 items-center flex-shrink-0"
            >
              <img
                src={
                  video.channelId?.profilePicture || video.user?.profilePicture
                }
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <div className="font-semibold text-lg">
                  {video.user?.username}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(video.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="ml-4 bg-white text-black py-2 px-5 rounded-3xl flex justify-center items-center font-semibold cursor-pointer text-sm hover:bg-gray-200 transition duration-200">
                Subscribe
              </div>
            </Link>
            <div className="flex gap-4 bg-[#a5a4a438] justify-center items-center p-3 rounded-3xl cursor-pointer select-none">
              <div className="flex gap-2 items-center" onClick={handleLike}>
                {liked ? (
                  <ThumbUpAltIcon className="text-white" />
                ) : (
                  <ThumbUpOffAltIcon className="text-white" />
                )}
                <div className="font-semibold">{video.likes}</div>
              </div>
              <div className="w-px h-5 bg-gray-400"></div>
              <div className="flex gap-2 items-center" onClick={handleDislike}>
                {disliked ? (
                  <ThumbDownAltIcon className="text-white" />
                ) : (
                  <ThumbDownOffAltIcon className="text-white" />
                )}
                <div className="font-semibold">{video.dislikes}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 bg-[#a5a5a538] w-full rounded-lg font-medium text-sm gap-3 mt-4">
            <div>
              {video.createdAt}{" "}
              <span className="text-gray-400">#latest #ontrending</span>
            </div>
            <div>{video.description}</div>
          </div>
        </div>
        {/* Comments Section */}
        <div className="flex flex-col mt-8">
          <div className="text-xl font-medium">{comments.length} Comments</div>
          <div className="flex mt-6 gap-3">
            <img
              src={
                video.channelId?.profilePicture ||
                video.user?.profilePicture
              }
              alt="profilecomment"
              className="w-10 h-10 rounded-full"
            />
            {/* Input for comment */}
            <div className="flex flex-col w-full">
              <input
                type="text"
                placeholder="Add a comment"
                value={inputField.comment}
                onChange={handleCommentChange}
                className="w-full bg-black text-white border-b border-gray-600 focus:outline-none placeholder:text-base px-2 py-1"
              />
              <div className="flex justify-end gap-4 mt-3">
                <button
                  className="p-2 px-4 rounded-3xl font-semibold border border-gray-600 cursor-pointer hover:bg-white hover:text-black transition duration-200"
                  onClick={() => setInputField({ comment: "" })} // Cancel action
                >
                  Cancel
                </button>
                <button
                  className="p-2 px-4 font-semibold rounded-3xl border border-gray-600 cursor-pointer hover:bg-white hover:text-black transition duration-200"
                  onClick={handleCommentSubmit} // Submit comment
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
          {/* Render comments */}
          {comments.map((comment) => (
            <div
              key={comment._id || comment.commentId}
              className="flex flex-col gap-3 mb-6"
            >
              <div className="flex gap-3">
                <img
                  src={
                    comment.channelId?.profilePicture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC-yqd_apHIsV5Ws6LKPrNWGNUUq9mS10DSw&s"
                  }
                  alt="profilecomment"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium">{comment.userId}</div>
                    <div className="text-sm text-gray-400">
                      {new Date(comment.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{comment.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Suggestion Videos Section */}
      <div className="flex flex-col max-w-sm w-full gap-6 text-white py-4">
        {/* Suggestion video 1 */}
        <div className="flex gap-4 cursor-pointer mb-4">
          <div className="w-28 h-16 flex-shrink-0">
            <img
              src="https://i.ytimg.com/vi/z70666lWdhw/maxresdefault.jpg"
              alt="videothumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-sm truncate max-w-xs">
              Top 10 Comedy Movies of 2024
            </div>
            <div className="text-gray-400 text-xs">User 1</div>
            <div className="text-gray-400 text-xs">13k views · 1 day ago</div>
          </div>
        </div>
        {/* Suggestion video 2 */}
        <div className="flex gap-4 cursor-pointer">
          <div className="w-28 h-16 flex-shrink-0">
            <img
              src="https://i.ytimg.com/vi/z70666lWdhw/maxresdefault.jpg"
              alt="videothumbnail"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-medium text-sm truncate max-w-xs">
              Top 10 Comedy Movies of 2024
            </div>
            <div className="text-gray-400 text-xs">User 1</div>
            <div className="text-gray-400 text-xs">13k views · 1 day ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
