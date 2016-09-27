import { push } from 'react-router-redux';
import Constants from '../constants';
import { Socket } from 'phoenix';
import { httpGet, httpPost, httpDelete } from '../utils';

function setCurrentUser(dispatch, user) {
  dispatch({
    type: Constants.CURRENT_USER,
    currentUser: user,
  });
  // ...
}

const Actions = {
  signIn: (email, password) => {
    return dispatch => {
      const data = {
        session: {
          email: email,
          password: password,
        },
      };

      httpPost('/api/v1/sessions', data)
        .then((data) => {
          localStorage.setItem('phoenixAuthToken', data.jwt);
          setCurrentUser(dispatch, data.user);
          dispatch(push('/'));
        })
        .catch((error) => {
          error.response.json()
            .then((errorJSON) => {
              dispatch({
                type: Constants.SESSIONS_ERROR,
                error: errorJSON.error,
              });
            });
        });
    };
  },
  signOut: () => {
    return dispatch => {
      httpDelete('/api/v1/sessions')
        .then((data) => {
          localStorage.removeItem('phoenixAuthToken');

          dispatch({
            type: Constants.USER_SIGNED_OUT,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };
  },
  currentUser: () => {
    return dispatch => {
      httpGet('/api/v1/current_user')
        .then((data) => {
          setCurrentUser(dispatch, data);
        })
        .catch((error) => {
          console.log(error);
          dispatch(push('/sign_in'));
        });
    };
  },
  setCurrentUser(dispatch, user) {
    dispatch({
      type: Constants.CURRENT_USER,
      currentUser: user,
    });

    const socket = new Socket('/socket', {
      params: {token: localStorage.getItem('phoenixAuthToken')},
    });

    socket.connect();

    const channel = socket.channel(`users:${user.id}`);

    channel.join().receive('ok', () => {
      dispatch({
        type: Constants.SOCKET_CONNECTED,
        socket: socket,
        channel: channel,
      });
    });
  },
  // ...
};

export default Actions;