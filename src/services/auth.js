import axios from 'axios'

const basePath = process.env.PUBLIC_URL || 'http://localhost:3977'


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