import axios from "axios";


const API_URL = "http://localhost:8080/api/v1/";

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