import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

//Pages
import AuthService from "./services/auth.service"
import HomePage from "./pages"
import NotFoundPage from "./pages/404"
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import AfterLoginPage from "./pages/afterLogin"
import ReportPage from "./pages/report"
import DayPlanPage from "./pages/dayPlan"
import PlansPage from "./pages/plans"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  isLoggedIn(){
    console.log(this.state.currentUser);
    if(this.state.currentUser == null){
      return false;
    }
    else{
      return true;
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    return <Router>
      <Switch>
        <Route exact path="/" render={() => (this.isLoggedIn() ? (<Redirect to="/welcome"/>) : (<HomePage />))} />
        <Route exact path ="/404" component={NotFoundPage} />
        <Route exact path ="/register" component={RegisterPage} />
        <Route exact path ="/login" component={LoginPage} />
        <Route exact path ="/welcome" render={() => (this.isLoggedIn() ? (<AfterLoginPage />) :  (<Redirect to="/"/>))} />
        <Route exact path ="/report" render={() => (this.isLoggedIn() ? (<ReportPage />) :  (<Redirect to="/"/>))}  />
        <Route exact path ="/dayplan" render={() => (this.isLoggedIn() ? (<DayPlanPage />) :  (<Redirect to="/"/>))} />
        <Route exact path ="/plans" render={() => (this.isLoggedIn() ? (<PlansPage />) :  (<Redirect to="/"/>))}  />
        <Redirect to="/404"/>
      </Switch>
    </Router>
  }
}

export default App;