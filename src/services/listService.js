import axios from 'axios'

const basePath = process.env.REACT_APP_BASE_URL


export const getList = idUser => {
    return axios.get(`${basePath}/list/${idUser}`,).then(response => response.data);
}
export const postList = (idUser, { name, items, color }) => {
    return axios.post(`${basePath}/list/${idUser}`, {
        idUser,
        name,
        items,
        color
    }).then(response => response.data);
}
export const updateListService = (idUser, idList, { name, items, color }) => {
    return axios.put(`${basePath}/list/${idUser}/${idList}`, {
        name,
        items,
        color
    }).then(res => res.data);
}
export const deletList = (idUser, idList) => {
    return axios.delete(`${basePath}/list/${idUser}/${idList}`).then(response => response.data);
}

export const getFullList = (idUser, idList) => {
    return axios.get(`${basePath}/list/${idUser}/${idList}`).then(response => response.data)
}