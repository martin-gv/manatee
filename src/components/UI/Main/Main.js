import React from "react";
import { Switch, Route } from "react-router-dom";

import Modal from "../../UI/Modal/ModalV2";
import ErrorModal from "../../UI/Modal/ErrorModal";

import AuthForm from "../../Auth/Form";
import AdminDashboard from "../../Admin/Dashboard";
import ClientList from "../../Client/List/List";
import ClientNew from "../../Client/New";
import ClientForm from "../../Client/Form/Form";
import CompanyView from "../../../views/CompanyView";
import PaymentView from "../../../views/PaymentView";
import OrderView from "../../../views/OrderView";
import OrderForm from "../../Order/Form";
import InventoryList from "../../Inventory/List/List";
import PricingProgramView from "../../../views/PricingProgram";

const Main = () => (
   <div className="main">
      <Modal />
      <ErrorModal />
      <Switch>
         <Route exact path="/login" component={AuthForm} />
         <Route exact path="/admin" component={AdminDashboard} />
         <Route exact path="/clients" component={ClientList} />
         <Route exact path="/clients/new" component={ClientNew} />
         <Route exact path="/clients/:id" component={ClientForm} />
         <Route path="/companies" component={CompanyView} />
         <Route exact path="/orders" component={OrderView} />
         <Route exact path="/orders/:id" component={OrderForm} />
         <Route exact path="/payments" component={PaymentView} />
         <Route exact path="/inventory" component={InventoryList} />
         <Route exact path="/pricing" component={PricingProgramView} />
      </Switch>
   </div>
);

export default Main;
