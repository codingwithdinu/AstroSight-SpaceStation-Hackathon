// src/pages/Home.jsx
import React from "react";
import UploadForm from "../components/UploadForm";

const Home = () => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mt-6">Welcome to AstroSight!</h2>
      <UploadForm />
    </div>
  );
};

export default Home;
