import {
  FETCH_FAIL,
  FETCH_PENDING,
  FETCH_SUCCESS,
  SET_LOCATION_DATA,
  SET_ADDRESS_DATA,
  SET_DURATION_DATA,
  SET_VOICE,
} from '../utils/constants';

const initialState = {
  isLoading: false,
  error: false,
  errMsg: '',
  dataPending: false,
  latLongs: [],
  addresses: [],
  duration: '',
  voice: '',
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PENDING:
      return {
        ...state,
        dataPending: true,
        errMsg: '',
        latLongs: [],
        addresses: [],
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        dataPending: false,
        errMsg: '',
      };
    case FETCH_FAIL:
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
      };
    case SET_DURATION_DATA:
      return {
        ...state,
        duration: action.data,
      };
    case SET_VOICE:
      return {
        ...state,
        voice: action.data,
      };
    default:
      return state;
  }
}

export default appReducer;
