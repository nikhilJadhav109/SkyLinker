import axios from "axios";
import { BASE_API } from "../constants/ApiConstant";
import gql from "graphql-tag";

const FLIGHT_API_BASE_URL = "http://localhost:8080";
const token = sessionStorage.getItem("jwt_token");

const GET_FLIGHTS = gql`query get_flights($fromCity: String!,$toCity: String!, $departureDate: String!) {
  get_flights(fromCity: $fromCity, toCity: $toCity ,departureDate: $departureDate) {
    id
    airlineName
    airlineNo
    departureDate
    arrivalDate
    fromCity
    toCity
    departureTime
    arrivalTime
    capacity
    availableSeats
    economyFare
    businessFare
  }
}`

class ApiService {
  fetchFlightById(aid) {
    return axios.get(BASE_API+"/customer/select_flight", {
      params: { aid: aid }, headers: { Authorization: `Bearer ${token}`}
    });
  }

  editFlight(flight) {
    return axios.put(BASE_API+"/manager/update_airline", flight, { headers: { Authorization: `Bearer ${token}`} });
  }

  getBookingsByFlightId(aid) {
    return axios.get(BASE_API+"/manager/get_bookings/" + aid, { headers: { Authorization: `Bearer ${token}`} });
  }

  getBookingsByUserId(uid){
    return axios.get(BASE_API+'/customer/get_userbookings/' + uid, { headers: { Authorization: `Bearer ${token}`} })
  }

  cancelBookingByBookId(bid) {
    return axios.delete(BASE_API+"/manager/delete_booking", {
      params: { bid: bid }, headers: { Authorization: `Bearer ${token}`}
    });
  }

  addAirline(flight) {
    return axios.post(BASE_API+"/admin/add_airline", flight, { headers: { Authorization: `Bearer ${token}`} });
  }
  updateBooking(airlineId) {
    console.log(airlineId);
    return axios.put(BASE_API+"/manager/update_booking/" + airlineId, { headers: { Authorization: `Bearer ${token}`} });
  }

  cancelBookingByUserId(bId){
    return axios.delete(BASE_API+'/customer/cancel_ticket' ,{ params: { bId : bId }, headers: { Authorization: `Bearer ${token}`} })
}

  getFlight(from, to, departure) {
    //console.log("in get flight"+fromCity + "  " + toCity + "  " + departureDate);
    return axios.get(
      BASE_API+"/search_flight/" + departure,
      {
        params: {
          fromCity: from,
          toCity: to,
        },
        headers: { Authorization: `Bearer ${token}`}
      }
    );
  }

  getFlightsGraphQL(fromCity, toCity, departureDate){
    const response = axios.post(BASE_API+'/graphql', {
      query: GET_FLIGHTS,
      variables: {
        fromCity,
        toCity,
        departureDate
      },
    });
    return response.data.data.get_flights;
  };

  getAirlineNames(){
    return axios.get(BASE_API+'/admin/airline_names', { headers: { Authorization: `Bearer ${token}`} })
  }
  addCities(cities){
    console.log("add cities axios");
    return axios.put(BASE_API+'/admin/add_city', cities, { headers: { Authorization: `Bearer ${token}`} })
  }
}

export default new ApiService();
