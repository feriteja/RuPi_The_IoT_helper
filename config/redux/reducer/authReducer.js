const initialState = {auth: false};
import {AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT} from '../action/index';

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {auth: true};

    case AUTH_LOGOUT:
      return {auth: false};

    default:
      return state;
  }
}
