import React from "react";
import { Switch, Route } from "react-router-dom";

import OrderList from "../components/Order/OrderList";

class OrderView extends React.Component {
   render() {
      const { path } = this.props.match;
      return (
         <div className="card">
            <div className="card-body">
               <Switch>
                  <Route exact path={path} component={OrderList} />
               </Switch>
            </div>
         </div>
      );
   }
}

export default OrderView;
