import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Api = axios.create({
    baseURL: BASE_URL
})

export default Api
