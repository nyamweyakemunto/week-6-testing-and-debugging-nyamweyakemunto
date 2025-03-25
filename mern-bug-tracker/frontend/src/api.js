import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/bugs";

// Fetch all bugs
export const getBugs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new bug
export const createBug = async (bugData) => {
  const response = await axios.post(API_URL, bugData);
  return response.data;
};

// Update a bug
export const updateBug = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

// Delete a bug
export const deleteBug = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
