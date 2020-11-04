import axios from 'axios'

export const axiosInstance = () => {
    const token = sessionStorage.getItem('token');
    const instance = axios.create({
        baseURL: process.env.PUBLIC_URL || 'http://localhost:3977',
        headers: {
            authorization: token || ''
        }
    })
    return instance;
}
