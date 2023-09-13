import axios from 'axios';
import { BASE_API } from '../constants/ApiConstant';

const USER_API_BASE_URL = 'http://localhost:8080';

const token = sessionStorage.getItem("jwt_token");

class ApiService {
    

    fetchUserById(userid) {
        return axios.get(BASE_API+'/user/get_user/'+userid,{ headers: { Authorization: `Bearer ${token}`} } );
    }

    editUser(user, uid) {
        return axios.put(BASE_API+'/user/edit_profile', user, { params: { uid : uid }, headers: { Authorization: `Bearer ${token}`} })
    }
    getbookingsByUserId(uid)
    {
        return axios.get(BASE_API+'/customer/get_userbookings/'+uid, { headers: { Authorization: `Bearer ${token}`} })
    }
    postFeedback(feedback, bid)
    {
        return axios.put(BASE_API+'/customer/post_feedback', feedback, { params: { bid : bid }, headers: { Authorization: `Bearer ${token}`} } )
    }

    bookTicket(book){
        return axios.post(BASE_API+'/customer/book-ticket', book, { headers: { Authorization: `Bearer ${token}`} })
    }
}

export default new ApiService();