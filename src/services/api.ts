import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

const API_PORT = 3001;

export const api = axios.create({
    baseURL: `http://localhost:${API_PORT}`,
    headers: {
        Authorization: `Bearer ${cookies['rpcook.token']}`
    }
});