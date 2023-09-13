import axios from 'axios';
import { BASE_API } from '../constants/ApiConstant';
const MANAGER_API_BASE_URL = 'http://localhost:8080';
const token = sessionStorage.getItem("jwt_token");

class ApiService{
    fetchPassengersByFlightId(airId) {
        return axios.get(BASE_API+'/manager/passenger_list/' + airId , { headers: { Authorization: `Bearer ${token}`} });
    }
}

export default new ApiService();