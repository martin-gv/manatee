import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "../components/Client/List/ClientList";
import Form from "../components/Client/Form/ClientForm";

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
