# YouTube Clone Project

This is a full-stack YouTube clone application consisting of a **backend** API server and a **frontend** React client. The project allows users to upload videos, create channels, search videos, and more.

---

## Folder Structure

### Backend
```
backend/
├── config/                 # Configuration files (database, cloudinary)
├── controllers/            # Route controllers for auth, channels, videos
├── middleware/             # Middleware for authentication, file upload, etc.
├── models/                 # Mongoose models (User, Channel, Video)
├── routes/                 # Express route definitions (auth, channels, videos)
├── .env                    # Environment variables (not committed)
├── package.json            # Backend dependencies and scripts
├── server.js               # Entry point for backend server
└── ...
```

### Frontend
```
frontend/
├── public/                 # Static assets and index.html
├── src/
│   ├── assets/             # Images, videos, icons used in the app
│   ├── Component/          # React components (Navbar, HomePage, SearchBar, SideNavbar, CreateChannel)
│   ├── data/               # Local data files (localVideos)
│   ├── pages/              # React pages (Home, Login, Profile, VideoUpload,MyChannels,SearchResult,Signup,VideoUpdated)
│   ├── App.jsx             # Main React app component
│   ├── index.jsx           # React app entry point
│   └── ...                 
├── package.json            # Frontend dependencies and scripts
└── ...
```

---

## Features

- User authentication (signup, login) with token expiration handling that shows a toast notification to inform the user when their session expires.
- Create and manage channels.
- Upload and update videos, with upload functionality disabled if the user does not have a channel.
- Search videos.
- View video details and profiles.
- Responsive UI with React and Material UI.
- Video streaming and playback.
- Commenting on videos.
- Like and dislike videos.
- View all user channels in the SideNavbar under the "My Channels" button if the user has channels.
---

## Prerequisites

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB instance (local or cloud)
- Cloudinary account for video/image storage

---

## Setup and Running the Application

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder with the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   - For development with auto-reload:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

The backend server will run on `http://localhost:8000` by default.

---

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` by default and is configured to communicate with the backend server.

---


## GitHub link : 
   `https://github.com/Amisha73/Youtube-Clone`

## Usage

- Open your browser and go to `http://localhost:3000`
- Sign up or log in to create your channel
- Upload videos and manage your profile
- Search for videos using the search bar
- Browse channels and watch videos
- comment on video, like or dislike the video

---

## Notes

- Ensure MongoDB is running and accessible via the connection string in `.env`
- Cloudinary credentials are required for uploading and storing videos/images
- CORS is configured to allow requests from `http://localhost:3000` to the backend

---
