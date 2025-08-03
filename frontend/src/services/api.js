// src/services/api.js
const API_URL = "http://localhost:8000/api";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/inference`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload image");

  return await response.json();
};
