import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route  } from "react-router-dom";
import HeaderBar from './ui-util/HeaderBar';
import LoginScreen from './components/Login/LoginScreen'
import HomeScreen from './components/Home/HomeScreen'
import UserScreen from './components/User/UserScreen'


import 'bootstrap/dist/css/bootstrap.min.css';
import "semantic-ui-css/semantic.min.css";

const Root = () => (
  <div style={{height: "100%", display: "flex", flexDirection: "column"}}>
    <Router >
      <HeaderBar/>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/home" component={HomeScreen} />
      <Route exact path="/user" component={UserScreen} />
    </Switch>
  </Router>
  </div>
  );

ReactDOM.render(<Root />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
