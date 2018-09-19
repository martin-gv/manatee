import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { resetIdleTimeout } from "../../../store/actions/auth";

import Modal from "../../UI/Modal/ModalV2";
import ErrorModal from "../../UI/Modal/ErrorModal";

import AuthForm from "../../Auth/Form";
import Dashboard from "../../Dashboard/Dashboard";
import ClientNew from "../../Client/New";
import ClientView from "../../../views/ClientView";
import CompanyView from "../../../views/CompanyView";
import OrderView from "../../../views/OrderView";
import PaymentView from "../../../views/PaymentView";
import OrderForm from "../../Order/Form";
import InventoryList from "../../Inventory/List/List";
import PricingProgramView from "../../../views/PricingProgram";
import AdminDashboard from "../../Admin/Dashboard";

class Main extends React.Component {
   componentDidMount() {
      this.props.resetIdleTimeout();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location)
         this.props.resetIdleTimeout(this.props.timer);
   }

   render() {
      return (
         <div className="main">
            <Modal />
            <ErrorModal />
            <Switch>
               <Route exact path="/login" component={AuthForm} />
               <Route exact path="/dashboard" component={Dashboard} />
               <Route path="/clients" component={ClientView} />
               <Route exact path="/clients/new" component={ClientNew} />
               <Route path="/companies" component={CompanyView} />
               <Route exact path="/orders" component={OrderView} />
               <Route exact path="/orders/:id" component={OrderForm} />
               <Route exact path="/payments" component={PaymentView} />
               <Route exact path="/inventory" component={InventoryList} />
               <Route exact path="/pricing" component={PricingProgramView} />
               <Route exact path="/admin" component={AdminDashboard} />
            </Switch>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      timer: state.system.idleTimer,
      user: state.users.currentUser
   };
}

export default withRouter(
   connect(
      mapStateToProps,
      { resetIdleTimeout }
   )(Main)
);
