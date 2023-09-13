import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";
import ReCAPTCHA  from "react-google-recaptcha"
import CitiesAPIService from "../service/CitiesAPIService";
import FlightAPIService from "../service/FlightAPIService";
import Header from "../components/Header";
import "../css/welcome.css"
import swal from "sweetalert";
import AuthenticationService from "../service/AuthenticationService";
import { useHistory } from "react-router-dom";



const SigninScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // fromcity: "",
  //     toCity: "",
  //     departureDate: "",
  const [fromcity, setFromcity] = useState("");
  const [toCity, setTocity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [cities, setCities] = useState([]);
  const [flights, setFlights] = useState([]);

  const [fromcityError, setFromcityError] = useState("")
  const [toCityError, setToCityError] = useState("")
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [departureDateError, setDepartureDateError] = useState("")

  const userSignin = useSelector((store) => store.userSignin);
  const { loading, error, response } = userSignin;
  const [cap, setCap] = useState(true);

  const historyHook = useHistory();

  const dispatch = useDispatch();

  const handleonChange=(value)=> {
    setCap((current) => !current);
  }

  const loadCities= () =>{
    CitiesAPIService.fetchCities().then((res) => {
      console.log(res);
     
      setCities(res.data.data)
      console.log(cities);
    });
  }

  const searchFlight = (e) => {
    
    console.log(
      "In clg " +
        fromcity +""+
        toCity +
        " " +
        departureDate
    );
    e.preventDefault();
    console.log(new Date());
    if(!fromcity)
    setFromcityError("Please Select a City");
    else setFromcityError("");

    if(fromcity === toCity)
      setToCityError("Please Select different Cities");
    else if(!toCity)
    setToCityError("Please Select a City" ); 
    else setToCityError("");

    const today = new Date();
    const selected = new Date(departureDate);

    if(!departureDate)
      setDepartureDateError("Please select Journey Date" );
    else if(selected < today.setHours(0,0,0,0))
      setDepartureDateError("Please select a Valid Journey Date" );
    else setDepartureDateError("");
    
    if( !(fromcity === toCity) && fromcity && 
        toCity && 
        departureDate && selected > today.setHours(0,0,0,0))  
    {
      FlightAPIService.getFlight(
        fromcity,
        toCity,
        departureDate
      ).then((res) => {
        console.log(res);
        
        setFlights(res.data)
        console.log(flights);
      });
      
    }
  };
  
  const onLogin = () => {
    if (!email) setEmailError("Email is required");
    else setEmailError("");
    if (!password) setPasswordError("Password Is Required ");
    else setPasswordError("");
    AuthenticationService.authenticateUser(email, password)
    .then((response) => {
      console.log("auth success", response);
      AuthenticationService.storeUserDetails(email, response.data.jwt);
      console.log("welcome");
      // setlogin(true);
      // setauthenticated(true);
      // navigation(`/home/${userName}`);
    })
    .catch((error) => {
      // swal("Oops", "Wrong username or password", "error");
      console.log("auth failed ", error.message);
    });
    if (email && password) dispatch(signin(email, password));

  };

  useEffect(() => {
    loadCities();
    if (
      response &&
      response.status === "success" &&
      response.data.userRole === "CUSTOMER"
    ) {
      sessionStorage.setItem("user", response.data);
      sessionStorage.setItem("userid", response.data.id);
      sessionStorage.setItem("userRole", response.data.userRole);
      // props.history.push("/customer/search_flight");
      historyHook.push("/customer/search_flight");
      window.location.reload();
    } else if (
      response &&
      response.status === "success" &&
      response.data.userRole === "MANAGER"
    ) {
      sessionStorage.setItem("user", response.data);
      sessionStorage.setItem("userid", response.data.id);
      sessionStorage.setItem("userRole", response.data.userRole);
      props.history.push("/manager");
      window.location.reload();
    } else if (
      response &&
      response.status === "success" &&
      response.data.userRole === "ADMIN"
    ) {
      sessionStorage.setItem("user", response.data);
      sessionStorage.setItem("userid", response.data.id);
      sessionStorage.setItem("userRole", response.data.userRole);
      props.history.push("/admin");
      window.location.reload();
    } else if (response && response.status === "error") {
      alert(response.error);
      
    } else if (error) {      
      swal("Oops", "Wrong username or password", "error");
    }
  }, [loading, error, response]);
  return (
     <div className="my-container"> 
      
      <form>          
          <div>
            <div class="row">
              <div class="col-4">
                <label for="fromcity">From</label>
                <select
                  id="fromcity"
                  class="form-control"
                  name="fromcity"
                  placeholder="select from city"
                  onChange={(e) => {
                    setFromcity(e.target.value);
                  }}
                >
                 <option value="from" hidden selected>From</option>
                  {cities.map((city) => {
                    return <option key={city.id} value={city.city}>{city.city}</option>;
                  })}
                </select>
                <h6 className="text-danger text-center my-4">
                  {fromcityError}
                </h6>
              </div>
              <div class="col-4">
                <label for="toCity">Destination</label>
                <select
                  id="toCity"
                  class="form-control"
                  name="toCity"
                  placeholder="select from city"
                  onChange={(e) => {
                    setTocity(e.target.value);
                  }}
                >
                  <option value="destination" hidden selected>Destination</option>
                  {cities.map((city) => {
                    return <option key={city.id} value={city.city}>{city.city}</option>;
                  })}
                </select>
                <h6 className="text-danger text-center my-4">
                  {toCityError}
                </h6>
              </div>
              <div class="col-4">
                <label>Departure Date</label>
                <input
                  type="date"
                  class="form-control"
                  name="departureDate"
                  placeholder="Departure Date"
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                  }}
                />
                <h6 className="text-danger text-center my-4">
                  {departureDateError}
                </h6>
              </div>
            </div>
            
            <button  className="btn btn-success" onClick={searchFlight}>
              Search
            </button>
          </div>
        </form>
        {flights === "Currently No Flights Available For this Route" &&
          <div className="text-danger text-center my-4">Currently No Flights Available For this Route</div>
        }
        {flights !=="Currently No Flights Available For this Route" && flights.length > 0 && (
          <div className="my-4">
            <table class="table caption-top">
              <thead>
                <tr>
                  <th scope="col">Airline Name</th>
                  <th scope="col">Airline Number</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Departure Date</th>
                  <th scope="col">Arrival Date</th>
                  <th scope="col">Departure Time</th>
                  <th scope="col">Arrival Time</th>
                  <th scope="col">Economy Fare</th>
                  <th scope="col">Business Fare</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => {
                  return (
                    <tr key={flight.id}>
                      <td scope="row">{flight.airlineName}</td>
                      <td>{flight.airlineNo}</td>
                      <td>{flight.fromCity}</td>
                      <td>{flight.toCity}</td>
                      <td>{flight.departureDate}</td>
                      <td>{flight.arrivalDate}</td>
                      <td>{flight.departureTime}</td>
                      <td>{flight.arrivalTime}</td>
                      <td>{flight.economyFare}</td>
                      <td>{flight.businessFare}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
         
          </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-md-6">
          <div className="login-wrap p-4 p-md-5">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-user-o"></span>
            </div>
            <h3 className="text-center mb-4">Have an account?</h3>
            {/* <form action="#" className="login-form"> */}
            <div className="form-group">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control rounded-left"
                placeholder="Email"
              />
              <h6 className="text-danger text-center my-4">{emailError}</h6>
            </div>
            <div className="form-group d-flex">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control rounded-left my-4"
                placeholder="Password"
                required=""
              />
              <h6 className="text-danger text-center">{passwordError}</h6>

            </div>
           
            <div><h6 className="float-end">New user<Link to="/signup"><span> register here</span></Link></h6></div><br/>

            
            <div className="form-group my-3">
              <button
                onClick={onLogin}
                disabled={!cap}
                type="submit"
                className="btn btn-primary rounded submit p-2 px-4"
              >
                Login
              </button>
            </div>
           
          </div>
          </div>
          <section>
          <div class="container ">


            <div class="clearfix"><br /></div>

            <div class="customer-security">
              <ul>
                <li>
                  <div class="img-bg img2">
                    <img width='250px' src="https://media.istockphoto.com/vectors/insurance-hand-icon-risk-coverage-sign-vector-vector-id1226966972?k=20&m=1226966972&s=612x612&w=0&h=4STddzCaJjYZNagXpw8PS2odwiNXm559OsNHwUMfFhE="></img>
                    <span><b>Why Choose us?</b></span>
                    <h5><p>Airline Reservation And Management System is a one step solution for all of your air ticket needs. We present exclusive offers or deals on domestic flight tickets. You can avail the enchanting deals via using promo codes, gift coupons and rewards. Apart from affordable flight booking you also get round the clock customer service.</p> </h5>
                  </div>

                  <div class="text-box">

                  </div>
                </li>
                <li>
                  <div class="img-bg img1">
                    <img width='250px' src="https://cheapestflightsearch.files.wordpress.com/2019/08/cheap-flights.png"></img>
                    <span><b>Find Affordable flight ticket</b></span>
                    <h5><p>Air travel is still a dream for many people and the reason is their small budget. That’s why we try to provide our customers affordable flight tickets. We give exclusive offers and rewards which makes your flight booking affordable. Before booking an air ticket you must check our offers section.</p></h5>
                  </div>
                  <div class="text-box">

                  </div>
                </li>
                <li>
                  <div class="img-bg img3">
                    <img width='250px' src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-technical-support-vector-24-7-support-working-online-tech-support-flat-png-image_5189955.jpg"></img>
                    <span>&nbsp;&nbsp;&nbsp;<b>24X7 support</b></span>
                  </div>
                  <div class="text-box">
                    <h5> Airline Reservation And Management System has a 24x7 customer support team which resolves all kinds of flight book issues as soon as possible. We value our customers' time. So we try to resolve all our customer queries as soon as possible. To get more information about flight booking or its prices call our expert customer executives.</h5>
                  </div>
                </li>
              </ul>



            </div>


          </div>
        </section>
        
      </div>
    </div>
  );
};

export default SigninScreen;
