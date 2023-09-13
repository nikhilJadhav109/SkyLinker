import {
  ADDMANAGER_FAIL,
  ADDMANAGER_REQUEST,
  ADDMANAGER_RESET,
  ADDMANAGER_SUCCESS,
} from "../constants/AdminConstants";

export const addManagerReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDMANAGER_REQUEST:
      return { loading: true };
    case ADDMANAGER_SUCCESS:
      return { loading: false, response: action.payload };
    case ADDMANAGER_FAIL:
      return { loading: false, error: action.payload };
    case ADDMANAGER_RESET:
      return {};
    default:
      return state;
  }
};
