import React from "react";
import { Switch, Route } from "react-router-dom";

import List from "../components/Company/List/CompanyList";
import Form from "../components/Company/Form/CompanyForm";

class CompanyView extends React.Component {
   render() {
      const { path } = this.props.match;
      return (
         <div>
            <Switch>
               <Route exact path={path} component={List} />
               <Route exact path={path + "/:companyID"} component={Form} />
            </Switch>
         </div>
      );
   }
}

export default CompanyView;
