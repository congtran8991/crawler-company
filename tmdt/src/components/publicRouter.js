import React from 'react';
import { Route, Redirect } from 'react-router-dom';
var getCookie=(cname)=> {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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
// const PrivateRoute = ({component: Component, ...rest}) => {
//     return (
//         <Route render={props => (
//             getCookie('token') ?
//                 <Component {...props} />
//             : <Redirect to="/" />
//         )} />
//     );
// };

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            !getCookie('token') ?
                <Component {...props} />
            : <Redirect to="/listCoompany"/>
        )} />
    );
};

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            getCookie('token') && restricted ?
            <Component {...props} /> : 
                <Redirect to="/" />
        )} />
    );
};



export default PublicRoute;
