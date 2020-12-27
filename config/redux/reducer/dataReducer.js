const initialState = null;
import {DATA_GETUSERINFO} from '../action/index';

export default function (state = initialState, action) {
  switch (action.type) {
    case DATA_GETUSERINFO:
      return {...action.data};

    default:
      return state;
  }
}
