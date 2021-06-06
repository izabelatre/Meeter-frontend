import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

//Pages
import HomePage from "./pages"
import NotFoundPage from "./pages/404"
import RegisterPage from "./pages/register"
import LoginPage from "./pages/login"
import AfterLoginPage from "./pages/afterLogin"
import ReportPage from "./pages/report"
import DayPlanPage from "./pages/dayPlan"
import PlansPage from "./pages/plans"

class App extends React.Component {
  render() {
    return <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path ="/404" component={NotFoundPage} />
        <Route exact path ="/register" component={RegisterPage} />
        <Route exact path ="/login" component={LoginPage} />
        <Route exact path ="/welcome" component={AfterLoginPage} />
        <Route exact path ="/report" component={ReportPage} />
        <Route exact path ="/dayplan" component={DayPlanPage} />
        <Route exact path ="/plans" component={PlansPage} />
        <Redirect to="/404"/>
      </Switch>
    </Router>
  }
}

export default App;