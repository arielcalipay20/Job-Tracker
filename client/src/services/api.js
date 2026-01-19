import axios from 'axios';

const BASEURL = 'http://localhost:5000/api';

export const api = axios.create({
    baseURL: BASEURL
});