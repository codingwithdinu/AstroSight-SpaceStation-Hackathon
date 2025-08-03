// src/components/UploadForm.jsx
import React, { useState } from "react";
import { uploadImage } from "../services/api";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    try {
      const response = await uploadImage(file);
      setResult(response);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-8 bg-white rounded shadow">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-sm font-medium">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="mt-6">
          <h3 className="font-bold mb-2">Gemini Response:</h3>
          <p>{result.response || "No response"}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
