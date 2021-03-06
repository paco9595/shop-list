import axios from 'axios'


const basePath = process.env.REACT_APP_BASE_URL

export const deleteItem = (idUser, idList, idItem) => {
    return axios.delete(`${basePath}/item/${idUser}/${idList}/${idItem}`).then(response => response.data);
}

export const updateItem = item => {
    return axios.put(`${basePath}/item/${item._id}`, { data: item })
}
