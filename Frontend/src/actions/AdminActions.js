import {
  ADDMANAGER_FAIL,
  ADDMANAGER_REQUEST,
  ADDMANAGER_SUCCESS,
} from "../constants/AdminConstants";
import axios from "axios";
import { BASE_API } from "../constants/ApiConstant";

// { headers: { Authorization: `Bearer ${token}`} }
const token = sessionStorage.getItem("jwt_token");
export const addManager = (firstName, lastName, email, password, mobileNo) => {
  return (dispatch) => {
    dispatch({
      type: ADDMANAGER_REQUEST,
    });

    const header = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
    };

const body = {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      status: 1,
      roles: ["ROLE_MANAGER"]
    };
    const url = BASE_API+"/admin/add_manager";
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: ADDMANAGER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ADDMANAGER_FAIL,
          payload: error,
        });
      });
  };
};
