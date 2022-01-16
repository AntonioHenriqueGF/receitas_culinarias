import axios from 'axios';

const API_PORT = 3001;

export const api = axios.create({
    baseURL: `http://localhost:${API_PORT}`,
});