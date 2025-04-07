import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profiles';

export const getProfiles = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProfile = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProfile = async (profile) => {
  const response = await axios.post(API_URL, profile);
  return response.data;
};

export const updateProfile = async (id, profile) => {
  const response = await axios.put(`${API_URL}/${id}`, profile);
  return response.data;
};

export const deleteProfile = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
