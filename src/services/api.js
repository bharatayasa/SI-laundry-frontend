import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
// const BASE_URL_LOCAL = import.meta.env.VITE_BASE_URL_LOCAL;

const Api = axios.create({
    baseURL: BASE_URL,
    // baseURL: BASE_URL_LOCAL
})

export default Api
