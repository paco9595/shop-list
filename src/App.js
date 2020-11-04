import React from 'react'
import { Home, Login } from './views'
import { NavbarComponent } from './components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App () {
  return (
    <Router>
      <NavbarComponent />
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
}




export default App;
