import { sessionService } from 'redux-react-session';


export const getListAction = (type, user, history) => {
    return () => sessionService.loadUser(data => {
        console.log('loadUser', data)
        return data
    });
};