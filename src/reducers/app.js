import {
  FETCH_FAIL,
  FETCH_PENDING,
  FETCH_SUCCESS,
  SET_LOCATION_DATA,
  SET_ADDRESS_DATA,
  SET_DURATION_DATA,
} from '../utils/constants';

const initialState = {
  isLoading: false,
  error: false,
  errMsg: '',
  dataPending: false,
  latLongs: [],
  addresses: [],
  duration: '',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        dataPending: true,
        latLongs: [],
        addresses: [],
      };
    case FETCH_SUCCESS:
      console.log('data success', action);
      return {
        ...state,
        dataPending: false,
      };
    case FETCH_FAIL:
      console.log('data fail', action);
      return {
        ...state,
        dataPending: false,
        errMsg: action.data,
      };
    case SET_LOCATION_DATA:
      return {
        ...state,
        latLongs: [...state.latLongs, action.data.location],
      };
    case SET_ADDRESS_DATA:
      return {
        ...state,
        addresses: [...state.addresses, action.data]
      }
    case SET_DURATION_DATA:
      return {
        ...state,
        duration: action.data,
      }
    default:
      return state;
  }
}

export default appReducer;
