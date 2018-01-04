import { INPUT_FIELD_SUCCESS, INPUT_FIELD_FAIL } from '../utils/constants';

export const inputFieldSuccess = data => ({
  type: INPUT_FIELD_SUCCESS,
  data,
});

export const inputFieldFail = (data) => {
  return {
    type: INPUT_FIELD_FAIL,
    data,
  };
};