import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./login";
import NavBar from "./navbar";
import Employee from "./employee";
import Customer from "./customer";
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path='/employee/:employeeID' component={Employee} />
          <Route path='/employee/:employeeID' component={Customer} />
          <Route path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
