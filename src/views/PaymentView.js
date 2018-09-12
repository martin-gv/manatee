import React from "react";
import { Switch, Route } from "react-router-dom";

import PaymentList from "../components/Payment/PaymentList/PaymentList";

class PaymentView extends React.Component {
   render() {
      const { path } = this.props.match;

      return (
         <div>
            <Switch>
               <Route exact path={path} component={PaymentList} />
            </Switch>
         </div>
      );
   }
}

export default PaymentView;
