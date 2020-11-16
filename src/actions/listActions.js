import { sessionService } from 'redux-react-session';


export const ListAction = (type, user, history) => {
    return () => sessionService.loadUser(data => {
        console.log('loadUser', data)
        return data
    });
};