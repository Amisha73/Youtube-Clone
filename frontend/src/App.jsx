import React, { useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import VideoUpload from "./pages/VideoUpload";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyChannels from "./pages/MyChannels";
import VideoUpdated from "./pages/VideoUpdated";
import SearchResult from "./pages/SearchResult";
import NotFound from "./pages/Notfound";


const App = () => {
  const [sideNavbar, setSideNavbar] = useState(false);

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };
  return (
    <div className="App bg-black ">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<VideoUpdated sideNavbar={sideNavbar}/>} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element = {<VideoUpload sideNavbar={sideNavbar}/>}/>
        <Route path="/signup" element={<SignUp sideNavbar={sideNavbar} />} />
        <Route path="/login" element={<Login sideNavbar={sideNavbar} />} />
        <Route path="/user/mychannel" element={<MyChannels sideNavbar={sideNavbar} />} />
        <Route path="/search" element={<SearchResult sideNavbar={sideNavbar}/>} />
        <Route path="*" element={<NotFound sideNavbar={sideNavbar} />} />
      </Routes>
    </div>
  );
};

export default App;
