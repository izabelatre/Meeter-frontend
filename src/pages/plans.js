import React from 'react'
import Footer from '../components/Footer.js'
import axios from 'axios'
//import DatePicker from 'react-date-picker';
import 'react-dropdown/style.css';
import background from '../assets/img/background.gif';
import MaterialTable from 'material-table'
import Navbar from '../components/NavbarLogin.js'
import AuthService from '../services/auth.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNjIyOTkzMTIzLCJleHAiOjE2MjI5OTY3MjN9.s3bstwMdr2yKzXpkvpggYG89J-zP56QmdaKdEKIiUok"

// if (AuthService.getCurrentUser() != null) {
//     token = AuthService.getCurrentUser().token
// }
const URL = 'http://localhost:8080/api/'
const headers = {
headers: {
    Authorization: "Bearer " + token
    
  }
}

const wrongValueAndRequired = value => {
  if (!(value.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/))) {
    return (
      <div className="alert alert-danger" role="alert">Dana powinna mieć format [HH:MM]
      </div>
    );
  }
};

const wrongValueAndRequiredPlan = value => {
  if (!(value.match(/^[1-9]+[0-9]*$/))) {
    return (
      <div className="alert alert-danger" role="alert">Dana powinna być liczbą (ID)
      </div>
    );
  }
};





class DisplayPage extends React.Component {

    constructor(props) {
    super(props);  
    this.handleDisplay = this.handleDisplay.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeFirstPlan = this.onChangeFirstPlan.bind(this);
    this.onChangeSecondPlan = this.onChangeSecondPlan.bind(this);

  this.state = {
    array: [],
    table: [],
    time: "",
    data: [],
    successful: false,
    message: "",
    columns: [
     // { title: "ID", field: "id" },
      { title: "Nazwa", field: "name" },
      { title: "ID", field: "plan_id" },
      { title: "Start dnia", field: "day_start"},
      { title: "Koniec dnia", field: "day_end" }
    ],
    columns_meetings: [
      { title: "Początek spotkania", field: "start"},
      { title: "Koniec spotkania", field: "end" }
    ],
    data: [{ name: '', plan_id: "", day_start: "", day_end: ""  }],
    data_meetings: []
  };
}

handleDisplay(e) {
  e.preventDefault();

  this.setState({
    message: "",
    successful: false
  });

  this.form.validateAll();

  if (this.checkBtn.context._errors.length === 0) {
    

    var data = {
      meeting_time: this.state.time, 
      day_plan_ids: [this.state.firstPlan, this.state.secondPlan ]
      
  }

  console.log("klik")

  axios.post(URL + 'meeting-times', data, headers)
      .then((res) =>
          this.setState({
            data_meetings: res.data.meetings
          })
          )


    // axios.post()
    // AuthService.register(
    //   this.state.username,
    //   this.state.email,
    //   this.state.password
    // ).then(
    //   response => {
    //     this.setState({
    //       message: response.data.message,
    //       successful: true
    //     });
    //   },
    //   error => {
    //     const resMessage =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     this.setState({
    //       successful: false,
    //       message: resMessage
    //     });
    //   }
    // );
  }
}

componentDidMount () {

  axios.get(URL + 'plans', headers )
  .then(res => 
    this.setState({
    data: res.data}) 
  )
  console.log(localStorage.getItem("token"))
}

onChangeTime(e) {
  this.setState({
    time: e.target.value
  });
}

onChangeFirstPlan(e) {
  this.setState({
    firstPlan: e.target.value
  });
}

onChangeSecondPlan(e) {
  this.setState({
    secondPlan: e.target.value
  });
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
                  <br></br>
                  <MaterialTable
                    title="Plany dnia"
                        data= {this.state.data}
                         columns= {this.state.columns}
                   />
                  </div>


                  <Form
 
                  onSubmit={this.handleDisplay}
                  ref={c => {
                   this.form = c;
                   }}
   >
     <br></br><br></br>
                   <h4>Dodaj godziny spotkania</h4>
                   <br></br> 
                    {!this.state.successful && (
                      <div>
                    <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.time}
                          onChange={this.onChangeTime}
                          validations={[wrongValueAndRequired]}
                          placeholder="Czas spotkania"
                        />
                      </div>

                    <div className="form-group">
                      <Input
                       type="text"
                        className="form-control"
                        value={this.state.firstPlan}
                        onChange={this.onChangeFirstPlan}
                        validations={[wrongValueAndRequiredPlan] }
                        placeholder="Plan pierwszy"
                      />
                  </div>

                  <div className="form-group">
                      <Input
                       type="text"
                        className="form-control"
                        value={this.state.secondPlan}
                        onChange={this.onChangeSecondPlan}
                        validations={[wrongValueAndRequiredPlan] }
                        placeholder="Plan drugi"
                      />
                  </div>

<br></br>
         <div className="form-group">
           <button className="btn btn-secondary btn-block">Dodaj spotkanie</button>
         </div>
         <p style={{ 'white-space': 'pre-wrap'}}>{"Wszystkie pola muszą zostać uzupełnione. "}</p>           
       </div>
     )}

     <CheckButton
       style={{ display: "none" }}
       ref={c => {
         this.checkBtn = c;
       }}
     />

     <br></br>
         </Form>
         
         <div className="App">
                  <h3>Możliwe spotkania:</h3>
                  <MaterialTable
                    title="Spotkania"
                        data= {this.state.data_meetings}
                         columns= {this.state.columns_meetings}
                   />
                  </div>

                  </fieldset>
            </body>

        </div>

  );
}
}
   

export default DisplayPage;