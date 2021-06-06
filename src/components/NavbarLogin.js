import React from "react"
import {NavLink} from 'react-router-dom'

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
                                {/*<a class="nav-link" href="register">{this.props.text1}</a>*/}
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            
                            <li class="nav-item">
                                <NavLink to="/report" className="nav-link"> {this.props.text1}</NavLink>
                                {/*<a class="nav-link" href="register">{this.props.text1}</a>*/}
                            </li>
                            <li class="nav-item">
                                <NavLink to="/plans" className="nav-link"> {this.props.text3}</NavLink>
                                {/*<a class="nav-link" href="register">{this.props.text1}</a>*/}
                            </li>

                            <li class="nav-item">
                                <NavLink to="/dayplan" className="nav-link"> {this.props.text2}</NavLink>
                                {/*<a class="nav-link" href="register">{this.props.text1}</a>*/}
                            </li>

                            <li class="nav-item">
                                <NavLink to="/" className="nav-link">Wyloguj się</NavLink>
                                {/*<a class="nav-link" href="register">{this.props.text1}</a>*/}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;