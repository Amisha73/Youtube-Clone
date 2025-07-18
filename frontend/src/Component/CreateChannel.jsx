import React, { useState } from "react";

const CreateChannel = ({ onClose, onChannelCreated }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName || !channelBanner || !profilePicture) {
      setError("Please fill all required fields and upload images.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("description", description);
    formData.append("channelBanner", channelBanner);
    formData.append("profilePicture", profilePicture);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/channels/createchannel", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChannelCreated(data);
        onClose();
      } else {
        const errData = await response.json();
        setError(errData.message || "Failed to create channel.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-lg w-full max-w-md text-white">
        <h2 className="text-xl mb-4 font-semibold">Create Channel</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Channel Name"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white"
            rows={3}
          />
          <div>
            <label className="block mb-1">Channel Banner (Image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setChannelBanner)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Profile Picture (Image)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProfilePicture)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-white hover:bg-black text-black hover:text-white py-2 rounded disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Channel"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 text-gray-400 hover:text-gray-200"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChannel;
