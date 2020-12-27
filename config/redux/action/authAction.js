import Auth from '@react-native-firebase/auth';
import Firestore from '@react-native-firebase/firestore';
import {AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT} from './index';

function Authentication() {
  function checkauthstat() {
    return async (dispatch) => {
      try {
        const authState = await Auth()?.currentUser;

        if (authState) {
          return dispatch({type: AUTH_LOGIN});
        }
        return null;
      } catch (error) {
        return error;
      }
    };
  }

  function register(data) {
    return async (dispatch) => {
      try {
        const result = await Auth().createUserWithEmailAndPassword(
          data.email,
          data.password,
        );
        await Firestore().collection('dataDevices').doc(result.user.uid).set({
          name: data.name,
        });
        dispatch({type: AUTH_LOGIN});

        return null;
      } catch (error) {
        console.log('error', error);
      }
    };
  }

  function login(data) {
    return async (dispatch) => {
      try {
        await Auth().signInWithEmailAndPassword(data.email, data.password);
        dispatch({type: AUTH_LOGIN});
        return null;
      } catch (error) {
        return 'Invalid Credentials';
      }
    };
  }

  function logout() {
    return async (dispatch) => {
      try {
        Auth().signOut();
        dispatch({type: AUTH_LOGOUT});

        return null;
      } catch (error) {
        return error;
      }
    };
  }

  return {logout, login, register, checkauthstat};
}

const authAction = Authentication();
export default authAction;
