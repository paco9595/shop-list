import axios from 'axios'

const basePath = process.env.REACT_APP_BASE_URL

const getAuth = (type, body) => {
    return axios.post(`${basePath}/user/auth/${type}`, { ...body }).then(({ data }) => {
        console.log(data)
        return {
            ...data
        }
    });
}

export {
    getAuth
}