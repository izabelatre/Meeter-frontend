import axios from "axios";


const API_URL = "https://meeter-backend.herokuapp.com/api/";

class AuthService {
  login(user, pass) {
      const json = JSON.stringify({ username: user, password: pass})
    return axios
      .post(API_URL + "login", json, {headers: {
      'Content-Type':  'application/json'}}, {dataType: 'jsonp'}
      )
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");
  }

  colorChange(){
    
    if(!localStorage.getItem("color")){
    localStorage.setItem("color", "yes")
  }else{
    if (localStorage.getItem("color") === "yes"){
      localStorage.setItem("color", "no")
    }
    else{
      localStorage.setItem("color", "yes")
    }
    }
  }


  register(user, email, pass) {
    return axios.post(API_URL + "register", {
      code: user,
      username: email,
      password: pass
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));;
  }
}

export default new AuthService();