import React from 'react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

class NotFoundPage extends React.Component {
  render() {
    return (
      <div>
        <Header text1="ERROR 404" text2="Page not found ):"/>
        <Footer />
      </div>
    );
  }
}

export default NotFoundPage;