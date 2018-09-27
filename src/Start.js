import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Login from "./components/UI/Login";
import Main from "./components/UI/Viewport/Viewport";

class Start extends React.Component {
   render() {
      const { user } = this.props;
      const isUser = !!Object.keys(user).length;

      return (
         <Router>
            <div>
               <Switch>
                  <Route exact path="/login" component={Login} />
                  <ProtectedRoute path="/" component={Main} isUser={isUser} />
               </Switch>
            </div>
         </Router>
      );
   }
}

function mapStateToProps(state) {
   return {
      user: state.users.currentUser
   };
}

export default connect(mapStateToProps)(Start);
