import React from 'react'
import Footer from '../components/Footer.js'
import axios from 'axios'
//import DatePicker from 'react-date-picker';
import 'react-dropdown/style.css';
import background from '../assets/img/background.gif';
import MaterialTable from 'material-table'
import Navbar from '../components/NavbarLogin.js'
import AuthService from '../services/auth.service';


var token = ""

if (AuthService.getCurrentUser() != null) {
    token = AuthService.getCurrentUser().token
}
const URL = 'http://localhost:8080/api/'
const headers = {
headers: {
    Authorization: "Bearer " + token
    
  }
}


class DisplayPage extends React.Component {

    constructor(props) {
    super(props);  

  this.state = {
    array: [],
    table: [],
    columns: [
     // { title: "ID", field: "id" },
      { title: "Nazwa", field: "name" },
      { title: "ID", field: "plan_id" },
      { title: "Start dnia", field: "day_start"},
      { title: "Koniec dnia", field: "day_end" }
    ],
    data: [{ name: '', plan_id: "", day_start: "", day_end: ""  }]
  };
}


componentDidMount () {

  console.log("POCZATEK")
  axios.get(URL + 'plans', headers )
  .then(res => 
    this.setState({
    data: res.data}) 
  )
  console.log("KONIEC")
}

  render() {
    const { array } = this.state;
  return (
    
   <div style={{ backgroundImage: `url(${background})` }}>
          <section>
          <Navbar text1="Zgłoś błąd" text3 = "Zaplanuj spotkanie" text2 = "Dodaj plan dnia"/>
          </section>
  <body class="login">
              <fieldset class="login">


                <div className="App">
                  <h1>Spotkania</h1>
                  <MaterialTable
                    title="Expenses"
                        data= {this.state.data}
                         columns= {this.state.columns}
                   />
                  </div>

                  </fieldset>
            </body>

        </div>

  );
}
}
   

export default DisplayPage;