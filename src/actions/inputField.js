import { INPUT_FIELD_SUCCESS, INPUT_FIELD_FAIL } from '../utils/constants';

// ip address entered in input field is valid
export const inputFieldSuccess = data => ({
  type: INPUT_FIELD_SUCCESS,
  data,
});

// ip address entered in input field is invalid
export const inputFieldFail = (data) => {
  return {
    type: INPUT_FIELD_FAIL,
    data,
  };
};