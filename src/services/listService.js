import axios from 'axios'

const basePath = process.env.PUBLIC_URL || 'http://localhost:3977'


export const getList = idUser => {
    return axios.get(`${basePath}/list/${idUser}`,).then(response => {
        return response.data
    });
}
export const postList = idUser => {
    return axios.post (`${basePath}/list/${idUser}`,).then(response => {
        return response.data
    });
}