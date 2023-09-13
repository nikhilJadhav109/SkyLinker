import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useEffect, useState } from "react";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const userSignin = useSelector((store) => store.userSignin);
  // const userSignin = useSelector((store) => store.userSignin);
  const { loading, error, response } = userSignin;
  // const role = sessionStorage.getItem("userRole");
  const [role,SetRole] = useState(sessionStorage.getItem("userRole"));

  const onLogout = () => {
    dispatch(logout());
    window.sessionStorage.removeItem("user");
    window.sessionStorage.removeItem("userid");
    window.sessionStorage.removeItem("userRole");
    window.sessionStorage.removeItem("jwt_token");
    props.history.push("/signin");
  };

  useEffect(() => {
    console.log("Manager screen use effect called");

    // dispatch(getFlights());
  }, [role]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        Airline Reservation System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!sessionStorage.getItem("userRole") && (
            <li className="nav-item">
              <Link to="/">
                <span className="nav-link">Home</span>
              </Link>
            </li>)}
            {sessionStorage.getItem("userRole") == "CUSTOMER" && (
            <li className="nav-item">
              <Link to="/customer/search_flight">
                <span className="nav-link">Home</span>
              </Link>
            </li>)}
            {sessionStorage.getItem("userRole") == "MANAGER" && (
            <li className="nav-item">
              <Link to="/manager">
                <span className="nav-link">Home</span>
              </Link>
            </li>)}
            {sessionStorage.getItem("userRole") == "ADMIN" && (
            <li className="nav-item">
              <Link to="/admin">
                <span className="nav-link">Home</span>
              </Link>
            </li>)}

            <li className="nav-item">
              <Link to="/contactUs">
                <span className="nav-link">Contact Us</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about">
                <span className="nav-link">About</span>
              </Link>
            </li>
            
            {!sessionStorage.getItem("userRole") && (
              <li className="nav-item">
                <Link to="/signup">
                  <span className="nav-link">Signup</span>
                </Link>
              </li>
            )}
            {userSignin.response && (
              <li className="nav-item">
                <Link to="/edit_profile">
                  <span className="nav-link">Edit Profile</span>
                </Link>
              </li>
            )}
          </ul>
          {sessionStorage.getItem("userRole") == "MANAGER" && (
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Manager Actions
                  </span>
                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link to="/update_flight">
                        <span className="dropdown-item">
                          Update Flight Schedule
                        </span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/cancel_flight">
                        <span className="dropdown-item">Cancel Flight</span>
                      </Link>
                    </li>

                    {/* <li>
                      <Link to="/cancel_booking">
                        <span className="dropdown-item">Cancel Booking</span>
                      </Link>
                    </li> */}
                      <Link to="/add_airline">
                          <span className="dropdown-item" href="#">
                            Add Flight
                          </span>
                      </Link>
                    <li>
                      <Link to="/passenger_list">
                        <span className="dropdown-item">Passenger List</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          {sessionStorage.getItem("userRole") == "ADMIN" && (
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin Actions
                    </span>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link to="/add_manager">
                          <span className="dropdown-item" href="#">
                            Add Manager
                          </span>
                        </Link>
                      </li>
                      {/* <li>
                        <Link to="/add_airline">
                          <span className="dropdown-item" href="#">
                            Add Airline
                          </span>
                        </Link>
                      </li> */}
                      <li>
                        <Link to="/show_feedback">
                          <span className="dropdown-item" href="#">
                            Show Feedbacks
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
          {sessionStorage.getItem("userRole") == "CUSTOMER" && (
              <div
                className="collapse navbar-collapse"
                id="navbarNavDarkDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <span
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Other Options
                    </span>
                    <ul
                      className="dropdown-menu dropdown-menu-light"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                      <Link to = "/show_userbookings">
                        <span className="dropdown-item" href="#">
                          Cancel Booking
                        </span>
                      </Link>
                      </li>
                      <li>
                        <Link to="/customer_showBookings">
                          <span className="dropdown-item" href="#">
                            Booking History
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            )}
        </div>
        {sessionStorage.getItem("userRole") && (
          <div className="d-flex">
            <button onClick={onLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
