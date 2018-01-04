import { INPUT_FIELD_SUCCESS, INPUT_FIELD_FAIL } from '../utils/constants';

const initialState = {
  origin: false,
  destination: false,
};

function inputFieldReducer (state = initialState, action) {
  console.log('inputFieldReducer!', state, action);
  switch (action.type) {
    case INPUT_FIELD_SUCCESS:
      if (action.data.id === 'origin') {
        return {
          ...state,
          origin: true,
        };
      } else if (action.data.id === 'destination') {
        return {
          ...state,
          destination: true,
        };
      }
      break;
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
      break;
    default:
      return state;
  }
};

export default inputFieldReducer;