import React from "react"
import {NavLink} from 'react-router-dom'
import AuthService from '../services/auth.service'

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item">
                                <NavLink to="/welcome" className="nav-link"> HOME</NavLink>
                            </li>
                        </ul>

                       
                        
                        <ul class="navbar-nav ml-auto">
                            
                            <li class="nav-item">
                                <NavLink to="/report" className="nav-link"> {this.props.text1}</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/plans" className="nav-link"> {this.props.text3}</NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink to="/dayplan" className="nav-link"> {this.props.text2}</NavLink>
                            </li>

                            <li class="nav-item">
                                <a href="/" className="nav-link" onClick={AuthService.logout}>
                                    Wyloguj
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;