import { Link } from 'react-router-dom'
import '../css/footer.css'

const Footer = () => {
  return (

    <div>
      <div >

        <div className="footer-dark">

          <footer>
            <section class="">
              <div className="row">
           
                {/* <div className="col-sm-6 col-md-3 item">
                <div className="footermid">
                <h3>About Us</h3>
                 <ul>
                 <li><Link  className="head" to="/aboutUs">About Us </Link></li>
                 <li><Link  className="head" to="/contactUs">Contact US </Link></li>
                 </ul>
             </div>
            </div> */}
                <div className="col-md-12 item text ">
                  <div className="footerlast">
                    <h2  >ARS</h2>
                    <p className="head">ARS is a one step solution for all of your air ticket needs. Apart from affordable flight booking you also get round the clock customer service.</p>
                  </div>
                </div>

                {/* <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a>

                </div> */}
              </div>
            </section>
            <div className="col-12 col-md-12 text-center">
              <img src="https://www.travolook.in/images/cardshm.jpg" ></img>
            </div>

            <p className="copyright"><b>@AirLineReservation&ManagementSystem 2023 All Rights Reserved</b></p>
          </footer>
        </div>
      </div>
    </div>
  )
}
export default Footer

// const Footer = (props) => {
//   return (
//     <div>
//       <footer class="footer mt-auto  bg-light">
//         <div class="container1" Style="text-align: center; background-color: #fcdcdc;">
//           <span class="text-muted">@AirLineReservationSystem 2022 All Rights Reserved</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// Footer.defaultProps = {
//   title: " ",
// };

// export default Footer;
