
  
import React, { Component } from "react";

import Navbar from '../components/Navbar.js'
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const vusername = value => {
    if (value.length < 0 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The code must be between 3 and 40 characters.
        </div>
      );
    }
  };
  
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  
  const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

class RegisterPage extends Component {

    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    
        this.state = {
          email: "",
          password: "",
          successful: false,
          message: "",
          isRegistered: false
        };
      }
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      handleRegister(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          successful: false
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
          AuthService.register(
            this.state.username,
            this.state.email,
            this.state.password
          ).then(
            response => {
              this.setState({
                message: response.data.message,
                successful: true
              });
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
    
              this.setState({
                successful: false,
                message: resMessage,
                isRegistered: true
              });
            }
          );
        }
      }
    

    render() {
      if(localStorage.getItem("color")=== "yes"){
        return (
            
            <div className="col-md-12">
                <Navbar text1="Zarejestruj się" text2="Zaloguj się" />
            <div className="card card-container">
                <br></br> <br></br>
            <body class="login_color">
              <fieldset class="login_color">
              <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
              >
                  <h3>Rejestracja</h3>
                  <br></br> 
                {!this.state.successful && (
                  <div>
                       <div className="form-group">
                  <label htmlFor="username">Code</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                    placeholder="Code"
                  />
                </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                        placeholder="Email"
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="password">Hasło</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                        placeholder="Hasło"
                      />
                    </div>
    <br></br>
                    <div className="form-group">
                      <button className="btn btn-secondary btn-block">Zarejestruj się</button>
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
              </Form>
              </fieldset>
            </body>
            </div>
          </div>
        );}
        else{
          return (
            
            <div className="col-md-12">
                <Navbar text1="Zarejestruj się" text2="Zaloguj się" />
            <div className="card card-container">
                <br></br> <br></br>
            <body class="login">
              <fieldset class="login">
              <Form
                onSubmit={this.handleRegister}
                ref={c => {
                  this.form = c;
                }}
              >
                  <h3>Rejestracja</h3>
                  <br></br> 
                {!this.state.successful && (
                  <div>
                       <div className="form-group">
                  <label htmlFor="username">Code</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                    placeholder="Code"
                  />
                </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[required, email]}
                        placeholder="Email"
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="password">Hasło</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                        validations={[required, vpassword]}
                        placeholder="Hasło"
                      />
                    </div>
    <br></br>
                    <div className="form-group">
                      <button className="btn btn-secondary btn-block">Zarejestruj się</button>
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
                /><p style={{ 'white-space': 'pre-wrap'}}>
                {this.state.isRegistered
                
                ? "Rejestracja udała się"
                : ""}
                </p>
              </Form>
              </fieldset>
            </body>
            </div>
          </div>
        );
        }
    }
}

export default RegisterPage;
