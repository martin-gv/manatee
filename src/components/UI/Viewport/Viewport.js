import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { resetIdleTimeout } from "../../../store/actions/auth";

import Modal from "../Modal/ModalV2";
import ErrorModal from "../Modal/ErrorModal";

import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

import Dashboard from "../../Dashboard/Dashboard";
import ClientView from "../../../views/ClientView";
import CompanyView from "../../../views/CompanyView";
import OrderView from "../../../views/OrderView";
import PaymentView from "../../../views/PaymentView";
import OrderForm from "../../Order/Form";
import InventoryList from "../../Inventory/List/List";
import PricingProgramView from "../../../views/PricingProgram";
import AdminDashboard from "../../Admin/Dashboard";

class Viewport extends React.Component {
   componentDidMount() {
      this.props.resetIdleTimeout();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.location !== this.props.location)
         this.props.resetIdleTimeout(this.props.timer);
   }

   render() {
      return (
         <div style={{ backgroundColor: "#f7f7f7" }}>
            <Navbar />
            <Sidebar />
            <div className="main">
               <Modal />
               <ErrorModal />
               <Switch>
                  <Route
                     exact
                     path="/"
                     render={() => <Redirect to="/clients" />}
                  />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route path="/clients" component={ClientView} />
                  <Route path="/companies" component={CompanyView} />
                  <Route exact path="/orders" component={OrderView} />
                  <Route exact path="/orders/:id" component={OrderForm} />
                  <Route exact path="/payments" component={PaymentView} />
                  <Route exact path="/inventory" component={InventoryList} />
                  <Route exact path="/pricing" component={PricingProgramView} />
                  <Route exact path="/admin" component={AdminDashboard} />
               </Switch>
            </div>
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
   )(Viewport)
);
