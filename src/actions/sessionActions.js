import { sessionService } from 'redux-react-session';
import { getAuth } from './../services'

export const LoginService = (type, user, history) => {
  return () => {
    return getAuth(type, user).then(response => {
      console.log('endpoind', response)
      const { token } = response;
      sessionService.saveSession({ token })
        .then(() => {
          const {name, email, picture, id} = response;
          sessionService.saveUser({name, email, picture, id})
            .then(() => {
              history.push('/home');
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
    });
  }
};

export const logout = (history) => {
  return () => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      history.push('/');
  };
};
