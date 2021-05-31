import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../components/NavbarLogin.js'


class AfterLoginPage extends React.Component {
  render() {
    return (
        <div>
          <section>
          <Navbar text1="Zgłoś błąd"/>
          </section>
          <section>
            <body class="afterLogin">
                <fieldset class="afterLogin">
                <br></br> <br></br> <br></br>
                    <h1>Witamy w aplikacji Meeter!</h1>
                    <br></br>
                    <p style={{ 'white-space': 'pre-wrap'}}>{"Zostałeś zalogowany. Możesz teraz korzystać z funkcji, które oferuje aplikacja. \n Aby przejść do wybranej funkcjonalności wybierz odpowiednie pole w menu "}</p>                    
                    <br></br> <br></br> <br></br><br></br><br></br><br></br>
                    <p class="m-0 text-center text-black small">Jeśli masz uwagi dotyczące aplikacji prosimy o kontakt.<NavLink to="/report" className="nav-link"> Zgłoś błąd</NavLink> </p>
                    
                </fieldset>
            </body>
            </section>
        </div>
    );
}
}

export default AfterLoginPage;