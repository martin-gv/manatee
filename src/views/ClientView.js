import React from "react";
import { Switch, Route } from "react-router-dom";
import Transition from "react-transition-group/Transition";

import List from "../components/Client/List/ClientList";
import Form from "../components/Client/Form/ClientForm";

const duration = 300;

const defaultStyle = {
   transition: `opacity ${duration}ms ease-out`,
   opacity: 0
};

const transitionStyles = {
   entering: { opacity: 0 },
   entered: { opacity: 1 }
};

class ClientView extends React.Component {
   render() {
      const { path } = this.props.match;
      return (
         <Switch>
            <Route exact path={path} component={List} />
            <Route exact path={path + "/:clientID"} component={Form} />
         </Switch>
      );
   }
}

export default ClientView;
