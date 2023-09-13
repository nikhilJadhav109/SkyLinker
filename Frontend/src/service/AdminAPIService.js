import axios from 'axios';
import qs from 'qs';
import { BASE_API } from '../constants/ApiConstant';
const SUPERADMIN_API_BASE_URL = 'http://localhost:8080';

const token = sessionStorage.getItem("jwt_token");

class ApiService{
    fetchFeedbackByFlightId(airId) {
        return axios.get(BASE_API+'/admin/feedback', { params: { airId : airId },headers: { Authorization: `Bearer ${token}`} } );
    }
   
    getTotalBookings(){
        return axios.get(BASE_API+'/admin/get_total_bookings', { headers: { Authorization: `Bearer ${token}`} });
    }
    getCancelledBookings(){
        return axios.get(BASE_API+'/admin/get_cancelled_bookings', { headers: { Authorization: `Bearer ${token}`} }); 
    }
    getAirlineRevenue(){
        return axios.get(BASE_API+'/admin/get_airline_revenue', { headers: { Authorization: `Bearer ${token}`} });
    }
}

export default new ApiService();