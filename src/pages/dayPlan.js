import React from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from '../components/NavbarLogin.js'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';
import MaterialTable from 'material-table';
import AuthService from '../services/auth.service';
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
import { useRef } from 'react';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
       To pole jest wymagane.
      </div>
    );
  }
};



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
 
const wrongValue = value => {
    if(value){
    if (!(value.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/))) {
      return (
        <div className="alert alert-danger" role="alert">Dana powinna mieć format [HH:MM]
        </div>
      );
    }
    }
  };

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

class DayPlanPage extends React.Component {

    constructor(props) {
        super(props);
        this.onChangeStartDay = this.onChangeStartDay.bind(this);
        this.onChangeEndDay = this.onChangeEndDay.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.refresh = this.refresh.bind(this);

        this.state = {
        start_day: "",
        end_day: "",
        start: "",
        end: "",
        name: "",
        meetings: [],
        table: [],
        meetings_columns: [
          { title: "Początek spotkania", field: "start" },
          { title: "Koniec spotkania", field: "end"},
          
        ],
        message: "",
        message1: "",
        successful: false,
        successful1:false
        };
      }

      
      onChangeStartDay(e) {
        this.setState({
          start_day: e.target.value
        });

      }
    
      onChangeEndDay(e) {
        this.setState({
          end_day: e.target.value
        });
      }

      onChangeStart(e) {
        this.setState({
          start: e.target.value,
          message1: ""
        });

      }
    
      onChangeEnd(e) {
        this.setState({
          end: e.target.value,
          message: ""
        });
      }

      onChangeName(e) {
        this.setState({
          name: e.target.value
        });
      }

      handleAdd(e) {

        e.preventDefault();
  
        this.setState({
          message: "",
          successful: false
        });
  
          if (this.state.start < this.state.end && (this.state.start.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)) && (this.state.end.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)) ) {   
            this.setState(prevState => ({
                meetings: [...prevState.meetings, {start: this.state.start, end: this.state.end}],
                table: [...prevState.table, {start: this.state.start, end: this.state.end}],
                successful1: true,
                message1: "Dodano spotkanie"
              }))
        }
        else{
          this.setState(prevState => ({
            successful1: false,
            message1: "Podano nieprawidłowe dane."
          }))
        }
      console.log(this.state.meetings)
    }

   
  
    handleEnd(e) {
      e.preventDefault();
      this.setState({
        message: "",
        successful: false
      });


      if((this.state.start_day < this.state.end_day) && (this.state.start_day.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)) && (this.state.end_day.match(/([0-1][0-9]|2[0-3]):[0-5][0-9]/)) && this.state.name){
              var data = {
                day_start: this.state.start_day, 
                day_end: this.state.end_day, 
                name: this.state.name, 
                meetings: this.state.meetings
               }
             axios.post(URL + 'plans', data, headers).then(res =>
              
             this.setState({
               successful: true,
              message: "Dodano plan pomyślnie",
              meetings: [],
              table: [],
              start_day: null,
              end_day: null,
              name: null
              
            }))
            .catch((error) => {
              if(error){
              this.setState({
                message: "Nieprawidlowe dane",
                successful: false
              })
            }
            })
      }
      else{
        this.setState({
          message: "Nieprawidlowe dane. Nie dodano planu."
        })
      }
  }

  refresh(data){
    this.setState({
      meetings: data
    })
  }

  render() {

    return (
        <div>
          <section>
            <Navbar text1="Zgłoś błąd" text3 = "Zaplanuj spotkanie" text2 = "Dodaj plan dnia"/>
          </section>
          <section>
            <body class="adding">
              <fieldset class="adding">
                <br></br><br></br>
                <h1>Dodaj plan dnia</h1>
                <br></br><br></br>
                <Form onSubmit={this.handleAdd}
                  ref={c => {
                    this.form = c; }}
                >
                  <h4>Dodaj godziny spotkania</h4>
                  <br></br> 
                  {!this.state.successful && (
                    <div>
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.start}
                          onChange={this.onChangeStart}
                          validations={[wrongValue]}
                          placeholder="Początek spotkania"
                        />
                      </div>
      
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.end}
                          onChange={this.onChangeEnd}
                          validations={[wrongValue] }
                          placeholder="Koniec spotkania"
                        />
                      </div>
                      <br></br>
                      <div className="form-group">
                        <button className="btn btn-secondary btn-block">Dodaj spotkanie</button>
                      </div>
                      <p style={{ 'white-space': 'pre-wrap'}}>{"Pamiętaj, że mozesz dodać kilka spotkań na jeden plan dnia. \n  Spotkania nie mogą ze sobą kolidować \n Spotkania mogą również pozostać puste. "}</p>           
                    </div>
                  )}
    
                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                      this.checkBtn = c;
                    }}
                  />
                  <br></br>

                  {this.state.message1 && (
                    <div className="form-group">
                      <div
                        className={
                          this.state.successful1
                          ? "alert alert-success"
                          : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {this.state.message1}
                      </div>
                  </div>
                  )}
                </Form>

<h4>Dodane spotkania</h4>
                <MaterialTable
                  title = ""
                  icons={tableIcons}
                  data= {this.state.table}
                  columns= {this.state.meetings_columns}

                  />
                  <br></br>
                <Form onSubmit={this.handleEnd}
                  ref={c => {
                    this.form = c;
                  }}
                >
                  <br></br><br></br>
                  <h4>Dodaj godziny dnia</h4>
                  <br></br> 
                  {!this.state.successful && (
                    <div>
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          name="username"
                          value={this.state.start_day}
                          onChange={this.onChangeStartDay}
                          validations={[wrongValueAndRequired]}
                          placeholder="Początek dnia"
                        />
                      </div>

                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          name="password"
                          value={this.state.end_day}
                          onChange={this.onChangeEndDay}
                          validations={[wrongValueAndRequired]}
                          placeholder="Koniec dnia"
                        />
                      </div>
                      <br></br>
                      <h4>Dodaj nazwę planu</h4>
                      <div className="form-group">
                        <Input
                          type="text"
                          className="form-control"
                          value={this.state.name}
                          onChange={this.onChangeName}
                          validations={[required]}
                          placeholder="Nazwa planu"
                        />
                      </div>
                      <br></br>
                      <div className="form-group">
                        <button className="btn btn-secondary btn-block" >Dodaj plan dnia</button>
                      </div>
                    </div>
                  )}
    
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

                  <CheckButton
                    style={{ display: "none" }}
                    ref={c => {
                     this.checkBtn = c;
                    }}
                  />
                  <p class="m-0 text-center text-black small">Aby zobaczyć dostępne plany dnia kliknij w przekierowanie.<NavLink to="/plans" className="nav-link"> Plany dnia</NavLink> </p>
                    
                </Form>
              </fieldset>
            </body>
          </section>
        </div>
  );}
}


export default DayPlanPage;