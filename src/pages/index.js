import React from 'react'
import Navbar from '../components/Navbar.js'
import Image1 from '../assets/img/calendar2.gif'

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <br></br><br></br><br></br>
        <Navbar text1="Zarejestruj się" text2="Zaloguj się" />
        <section>
          <div class="container">
            <div class="row align-items-center">
 
              <div class="col-lg-8 order-lg-2">
                <div class="p-5">
                  <img class="img" src={Image1} alt="" />
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="p-1">
                  <h1 class="display-4">Meeter</h1>
                  <p>Aplikacja pomagająca w zarządzaniu czasem i planowaniu spotkań.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default HomePage;