import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from '../constants/userConstants'
import axios from 'axios'
import { BASE_API } from '../constants/ApiConstant'
import AuthenticationService from '../service/AuthenticationService'

export const logout = () => {
  return (dispatch) => {
    sessionStorage.removeItem('token')
    dispatch({ type: USER_SIGNOUT })
    document.location.href = '/signin'
  }
}

export const signup = (firstName, lastName, email, password, mobileNo, status, roles) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      status,
      roles
    }
    // const url = BASE_API+'/user/signup'
    const url = BASE_API+'/api/signup'
    axios
      .post(url, body, header)
      .then((response) => {
        dispatch({
          type: USER_SIGNUP_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        dispatch({
          type: USER_SIGNUP_FAIL,
          payload: error,
        })
      })
  }
}

export const signin = (email, password) => {
  return (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
    })

    const header = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const body = {
      email,
      password,
    }
    const url = BASE_API+'/user/login'
    // const url = BASE_API+'/api/signin'
    axios
      .post(url, body, header)
      .then((response) => {
          //   AuthenticationService.authenticateUser(email, password)
          // .then((response) => {
          //   console.log("auth success", response);
          //   AuthenticationService.storeUserDetails(email, response.data.jwt);
          //   console.log("welcome");
          //   // setlogin(true);
          //   // setauthenticated(true);
          //   // navigation(`/home/${userName}`);
          // })
          // .catch((error) => {
          //   // swal("Oops", "Wrong username or password", "error");
          //   console.log("auth failed ", error.message);
          // });
        dispatch({
          type: USER_SIGNIN_SUCCESS,
          payload: response.data,
        })
      })
      .catch((error) => {
        console.log("in catch error");
        dispatch({
          type: USER_SIGNIN_FAIL,
          payload: error,
        })
      })
  }
}
