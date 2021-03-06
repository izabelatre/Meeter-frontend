import React from "react"

class Header extends React.Component {
    render() {
        return (
            <header class="masthead text-center text-white">
                <div class="masthead-content">
                    <div class="container">
                        <h1 class="masthead-heading mb-0">{this.props.text1}</h1>
                        <h2 class="masthead-subheading mb-0">{this.props.text2}</h2>      
                    </div>
                </div>
                <div class="bg-circle-1 bg-circle"></div>
                <div class="bg-circle-2 bg-circle"></div>
                <div class="bg-circle-3 bg-circle"></div>
                <div class="bg-circle-4 bg-circle"></div>
            </header>
        );
    }
}

export default Header;