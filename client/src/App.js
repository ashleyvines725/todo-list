
import React from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Signup from './components/signup'
import menuUser from './components/userComponents/menuUser'
import Error from './components/error'
import LoginForm from './components/login'
import Logout from './components/logout'
import 'bootstrap/dist/css/bootstrap.min.css'


function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/menuUser" component={menuUser}/>
        <Route exact path="/logout" component={Logout}/>
        <Route component={Error}/>
     </Switch>  
    </Router>
  );
}
export default App;

