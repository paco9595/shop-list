import axios from 'axios'

const basePath = process.env.BASE_URL

const getAuth = (type, body) => {
    console.log(basePath);
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