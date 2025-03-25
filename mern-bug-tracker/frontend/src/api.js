import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchBugs = () => API.get('/bugs');
export const createBug = (bugData) => API.post('/bugs', bugData);
export const updateBug = (id, bugData) => API.put(`/bugs/${id}`, bugData);
export const deleteBug = (id) => API.delete(`/bugs/${id}`);
