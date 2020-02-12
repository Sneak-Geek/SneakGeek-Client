import React, { Component } from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage';
import Footer from './Footer/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <LandingPage/>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
