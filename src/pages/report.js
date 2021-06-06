import React from "react";
import Navbar from '../components/NavbarLogin.js'
import Footer from '../components/Footer.js'

class ReportPage extends React.Component {
  render() {
      return (
          <div>
            <section>
            <Navbar text1="Zgłoś błąd" text3 = "Wyświetl plany dnia" text2 = "Dodaj plan dnia"/>
            </section>
            <section>
              <body class="report">
                  <fieldset class="report">
                      <h2>Zgłoszenie błędu</h2>
                      <br></br>
                      <p>W przypadku wykrycia błędu bądź awarii, proszę powiadom nas poprzez wysłania maila do administratora na adres: </p>
                      <h3>meeter@meeter.com</h3>
                  </fieldset>
              </body>
              </section>
              <Footer />
          </div>
      );
  }
}
export default ReportPage;