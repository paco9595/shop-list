import { axiosInstance } from './requester'

const googleAuth = async idToken => {
    const resposne = await axiosInstance().post('/user/auth/google', { idToken });
    sessionStorage.setItem('token', JSON.stringify(resposne.data.token));
}

export {
    googleAuth
}