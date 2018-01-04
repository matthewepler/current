import { INPUT_FIELD_SUCCESS, INPUT_FIELD_FAIL } from '../utils/constants';

const initialState = {
  origin: '',
  destination: '',
};

function inputFieldReducer (state = initialState, action) {
  switch (action.type) {
    case INPUT_FIELD_SUCCESS:
      if (action.data.id === 'origin') {
        return {
          ...state,
          origin: action.data.value,
        };
      } else if (action.data.id === 'destination') {
        return {
          ...state,
          destination: action.data.value,
        };
      }
      return state;
    case INPUT_FIELD_FAIL:
      if (action.data.id === 'origin') {
        return {
          ...state,
          origin: false,
        };
      } else if (action.data.id === 'destination') {
        return {
          ...state,
          destination: false,
        };
      }
      return state;
    default:
      return state;
  }
}

export default inputFieldReducer;
