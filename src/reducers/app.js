import {
  IP_FETCH_FAIL,
  IP_FETCH_PENDING,
  IP_FETCH_SUCCESS,
  SET_LAT_LONG,
} from '../utils/constants';

const initialState = {
  isLoading: false,
  error: false,
  dataPending: true,
  latLongs: [],
  addresses: [],
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case IP_FETCH_PENDING:
      return {
        ...state,
        dataPending: true,
        latLongs: [],
        addresses: [],
      };
    case IP_FETCH_SUCCESS:
      console.log('data success', action);
      return {
        ...state,
      };
    case IP_FETCH_FAIL:
      console.log('data fail', action);
      return {
        ...state,
      };
    case SET_LAT_LONG:
      console.log('setting lat/long', action.data);
      return {
        ...state,
        latLongs: [...state.latLongs, action.data],
      };
    default:
      return state;
  }
}

export default appReducer;
