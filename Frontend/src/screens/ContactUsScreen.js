import React, { Component } from 'react'
// import UserNavBar from '../components/Navigation'
// import Footer from '../components/Footer'
import '../css/contactus.css'
import '../App.css'


const ContactUsScreen = () => {
  return (
    <div class="card-deck" style={{ marginLeft: '50px', marginRight: '50px' }}>
      <table class="tableContact">
        <tr class="contactrow">
          <td>
            <div style={{ opacity: '0.75' }}>
              <img class="card-img-top cardimg" src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png" alt="Card image" />
              <div class="card-body text-center" style={{ color: 'black' }}>
              <br/><br/>
                <h4 class="card-title">Nikhil Jadhav</h4>
                <p class="card-text"><b> Email: nikhiljadhav109@gmail.com </b></p>
                <p class="card-text"><b>Mobile No. : 7276211090</b></p>
              </div>
            </div>
          </td>
        </tr>
        
        <tr class="contactrow">
          <td>
            <div style={{ opacity: '0.7' }}>
              <img class="card-img-top cardimg" src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png" />
              <div class="card-body text-center" style={{ color: 'black', marginLeft: '25px' }}>
                <br/><br/>
                <h4 class="card-title">Gaurav Mali</h4>
                <p class="card-text"><b> Email: gauravmali98510@gmail.com </b></p>
                <p class="card-text"><b> Mobile No. : 8275929788</b></p>
              </div>
            </div>
          </td>

        </tr>
      </table>
    </div>

  )
}

export default ContactUsScreen