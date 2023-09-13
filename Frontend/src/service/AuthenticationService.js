import axios from 'axios';
// import http from '../http-common';
import http from '../service/http-common'




    const authenticateUser = (userName, pwd) => {
      //make api call for auth
      console.log('auth call', userName, pwd);
      return http.post(`http://localhost:8080/api/signin` , {
        email: userName,
        password: pwd,
      });
    }
    const storeUserDetails = (userName, jwt) => {
      sessionStorage.setItem('jwt_token', jwt);
      // console.log('add user');
      sessionStorage.setItem('user_dtls', userName);
      //since user has logged in : now for every request to the backend : add req auth interceptor
      // setupRequestInterceptor(jwt);
      //user has logged in successfully : so add it's details under session storage
      // sessionStorage.setItem('user_dtls', userName);
      // sessionStorage.setItem('user_key', jwt);
    }
    const removeUserDetails = () => {
      console.log('rem user');
      sessionStorage.removeItem('user_dtls');
      // sessionStorage.removeItem('user_key');
    }
    const isUserLoggedIn = () => {
      console.log('chk user');
      return sessionStorage.getItem('user_dtls') === null ? false : true;
    }
    const getUserName = () => {
      return sessionStorage.getItem('user_dtls');
    }
  
    //set up axios request interceptor for JWT
    const setupRequestInterceptor = (jwt) => {
      //  const basicAuth = 'Basic ' + window.btoa(userName + ':' + password);
      axios.interceptors.request.use((config) => {
        if (isUserLoggedIn()) {
          //adding the authorization header to config
          config.headers.authorization = 'Bearer ' + jwt;
        }
        //return config
        return config;
      });
    }


export default {authenticateUser,getUserName,isUserLoggedIn,removeUserDetails,storeUserDetails};

