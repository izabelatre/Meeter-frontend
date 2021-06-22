import React from 'react'
import axios from 'axios'
import 'react-dropdown/style.css';
import background from '../assets/img/background.gif';
import MaterialTable from 'material-table'
import Navbar from '../components/NavbarLogin.js'
import AuthService from '../services/auth.service';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { forwardRef } from 'react';

var token = ""

if (AuthService.getCurrentUser() != null) {
    token = AuthService.getCurrentUser().token
}

const URL = 'https://meeter-backend.herokuapp.com/api/'
const headers = {
headers: {
    Authorization: "Bearer " + token
    
  }
}

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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
    table: [],
    time: "",
    successful: false,
    message: "",
    columns_plans: [
      { title: "Nazwa", field: "name" },
      { title: "ID", field: "plan_id", editable: 'never'},
      { title: "Start dnia", field: "day_start", editable: 'never'},
      { title: "Koniec dnia", field: "day_end", editable: 'never' }
    ],
    columns_meetings: [
      { title: "Początek spotkania", field: "start"},
      { title: "Koniec spotkania", field: "end" }
    ],
    data_plans: [],
    data_meetings: []
  };
}

handleDisplay(e) {
  e.preventDefault();



  this.form.validateAll();

  if (this.checkBtn.context._errors.length === 0) {
    var data = {
      meeting_time: this.state.time, 
      day_plan_ids: [this.state.firstPlan, this.state.secondPlan ]
      
  }

  axios.post(URL + 'meeting-times', data, headers)
      .then((res) =>
          this.setState({
            data_meetings: res.data.meetings
          })
          )
          this.setState({
            message:"Dane prawidłowe.",
            successful: true
          })
  }
  else{
    this.setState({
      message:"Dane nieprawidłowe.",
      successful: false
    })
  }
}

componentDidMount () {

  axios.get(URL + 'plans', headers )
  .then(res => 
    this.setState({
    data_plans: res.data}) 
  )
}

getPlans (){

  axios.get(URL + 'plans', headers )
  .then(res => 
    this.setState({
    data_plans: res.data}) 
  )
  window.location.reload();
  
}

onChangeTime(e) {
  this.setState({
    message: "",
    time: e.target.value
  });
}

onChangeFirstPlan(e) {
  
  this.setState({
    firstPlan: e.target.value,
    message: ""
  });
}

onChangeSecondPlan(e) {
  this.setState({
    message: "",
    secondPlan: e.target.value
  });
}

  render() {
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
                  icons={tableIcons}
                  data= {this.state.data_plans}
                  columns= {this.state.columns_plans}
                  editable={
                            {
                              onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    var newPlan = {
                                      id: oldData.id,
                                      name: newData.name,
                                      day_start: oldData.day_start,
                                      day_end: oldData.day_end,
                                      meetings: oldData.meetings
                                      
                                }
                                                  
                                axios.put(URL + "plans/" + oldData.plan_id, newPlan, headers)
                                    .then(this.getPlans())
                                    resolve(this.getPlans())
                                    
                                    }),

                              onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                axios.delete(URL + "plans/" + oldData.plan_id, headers)
                                .then(this.getPlans())
                                resolve(this.getPlans())
                                  }),
                              }}
                  />
                  </div>

                  <Form
                    onSubmit={this.handleDisplay}
                    ref={c => { this.form = c;}}
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
                            placeholder="Plan pierwszy (ID)"
                          />
                        </div>

                        <div className="form-group">
                          <Input
                          type="text"
                          className="form-control"
                          value={this.state.secondPlan}
                          onChange={this.onChangeSecondPlan}
                          validations={[wrongValueAndRequiredPlan] }
                          placeholder="Plan drugi (ID)"
                          />
                        </div>

                        {this.state.message && (
                          <div className="form-group">
                            <div
                              className={
                                this.state.successful
                                ? "alert alert-success"
                                : "alert alert-danger"
                                }
                            role="alert"
                          >
                      {this.state.message}
                    </div>
                  </div>
                )}
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
                            this.checkBtn = c; }}
                        />
                        <br></br>
                  </Form>
                  <div className="App">
                    <h3>Możliwe spotkania:</h3>
                    <MaterialTable
                      icons={tableIcons}
                      title="Spotkania"
                      data= {this.state.data_meetings}
                      columns= {this.state.columns_meetings}
                   />
                  </div>

                </fieldset>
              </body>
      </div>);}
}
   
export default DisplayPage;