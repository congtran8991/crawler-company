import React, { Component } from 'react';
import { BrowserRouter, Route, Link,Switch } from "react-router-dom";
import  App  from '../App';
import HomePage from './home-page';
import Login from './login';
import PublicRoute from './publicRouter';
//import PrivateRoute from './privateRouter'
const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}
class Router extends Component {
  constructor(props){
    super(props);
    this.state={
      tokenCookie : getCookie('token')
    }
  }
   render (){ 
     console.log(this.state.tokenCookie);
     let {tokenCookie} =this.state ;
    let routes = (
        <Switch>
          <Route exact path={"/"}>
             <Login />
          </Route> 
          <PublicRoute restricted={true} component={HomePage} path="/listCompany" exact />
          <PublicRoute restricted={true} component={App} path="/listCompany/:webId" exact />
        </Switch>
      );
       return(
        <BrowserRouter>
         {routes}
        </BrowserRouter>   
       )
   }
}
export default Router;