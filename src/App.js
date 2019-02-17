import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TopHeader from './components/TopHeader'
class App extends Component {
  render() {
    return (
      <div className="App">
      <div className = "container">
        <TopHeader />
      </div>
      </div>
    );
  }
}

export default App;