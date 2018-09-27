import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isUser, component: Component, ...rest }) => {
   return (
      <Route
         {...rest}
         render={props =>
            isUser ? (
               <Component {...props} />
            ) : (
               <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
               />
            )
         }
      />
   );
};

export default ProtectedRoute;
