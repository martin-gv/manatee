import React from "react";
import { connect } from "react-redux";

import {
   fetchCompany,
   updateCompany,
   companyInputChange,
   addCompanyContact,
   removeCompanyContact
} from "../../../store/actions/companies";
import { fetchClientByID_v2 } from "../../../store/actions/clients";
import { createOrder, fetchCompanyOrders } from "../../../store/actions/orders";
import { toggleModalV2 } from "../../../store/actions/system";

import { found, findByID } from "../../../utility/utility";

import FormField from "./FormField";
import PrimaryContact from "./PrimaryContact";
import Contacts from "./Contacts";
import Orders from "./CompanyOrders/CompanyOrders";
import AddContactModal from "./AddContactModal";
import NewOrderModal from "./CompanyOrders/NewOrderModal";
import Toolbar from "./Toolbar";

class CompanyForm extends React.Component {
   state = {
      ready: false,
      ordersReady: false,
      form: ["name", "address1", "city", "province", "country", "postalCode"],
      addContactModal: false,
      modalInput: "",
      newOrderModal: false,
      selectedContactID: ""
   };

   componentDidMount() {
      const { fetchCompany, fetchCompanyOrders } = this.props;
      const { companyID } = this.props.match.params;
      fetchCompany(companyID).then(
         ready => (ready ? this.setState({ ready }) : null)
      );
      fetchCompanyOrders(companyID).then(res => {
         if (found(res)) this.setState({ ordersReady: true });
      });
   }

   onChange = (e, id) => {
      this.props.companyInputChange(e, id);
   };

   onSubmit = (e, data) => {
      e.preventDefault();
      this.props.updateCompany(data);
   };

   removePrimaryContact = company => {
      this.props
         .updateCompany({ ...company, primaryContact: null })
         .then(success => {
            const e = { target: { name: "primaryContact", value: null } };
            if (success) this.props.companyInputChange(e, company._id);
         });
   };

   toggleModal = modal => {
      this.setState({ [modal]: !this.state[modal] });
   };

   addContact = e => {
      e.preventDefault();
      const id = this.state.modalInput;
      this.props.fetchClientByID_v2(id).then(res => {
         if (found(res)) {
            const client = findByID(res, "clientId", id);
            const { companyID } = this.props;
            const company = this.props.companies[0];
            this.props
               .updateCompany({
                  ...company,
                  contacts: [...company.contacts, client._id]
               })
               .then(success => {
                  if (success) {
                     this.props.addCompanyContact(companyID, client);
                     this.setState({ modalInput: "" });
                     this.toggleModal("addContactModal");
                  }
               });
         } else {
            this.props.toggleModalV2(true, "Error", "No client found");
         }
      });
   };

   removeContact = (id, company) => {
      const { companyID } = this.props;
      const data = {
         companyID,
         $pull: { contacts: id }
      };
      if (company.primaryContact._id === id) data.primaryContact = null;
      this.props.updateCompany(data).then(success => {
         if (success) this.props.removeCompanyContact(companyID, id);
         if (company.primaryContact._id === id) {
            const e = { target: { name: "primaryContact", value: null } };
            this.props.companyInputChange(e, companyID);
         }
      });
   };

   makePrimaryContact = client => {
      const { companyID } = this.props;
      const data = {
         companyID,
         primaryContact: client._id
      };
      this.props.updateCompany(data).then(success => {
         const e = { target: { name: "primaryContact", value: client } };
         if (success) this.props.companyInputChange(e, companyID);
      });
   };

   newOrder = e => {
      e.preventDefault();
      const { selectedContactID } = this.state;
      this.props
         .createOrder(selectedContactID, this.props.companyID)
         .then(res => {
            if (res) {
               this.setState({ selectedContactID: "" });
               this.toggleModal("newOrderModal");
            }
         });
   };

   handleOrderRowClick = id => {
      this.props.history.push("/orders/" + id);
   };

   render() {
      const {
         ready,
         ordersReady,
         form,
         addContactModal,
         modalInput,
         newOrderModal,
         selectedContactID
      } = this.state;
      const { companies, companyID } = this.props;

      const company = ready
         ? companies.find(el => el.companyID === +companyID)
         : {};
      const contacts = ready ? company.contacts : [];
      const orders = ordersReady ? this.props.orders : [];

      const fields = form.map(el => (
         <FormField
            key={el}
            field={el}
            value={company[el]}
            onChange={e => this.onChange(e, company._id)}
         />
      ));

      let loader = null;
      if (!ready) {
         loader = <div className="loader">Loading...</div>;
      }

      return (
         <div className="card full-height">
            {loader}
            {ready && (
               <div className="ui grid">
                  <div className="six wide column">
                     <h2 style={{ marginBottom: 40 }}>{company.name}</h2>
                     <form
                        className="ui form"
                        onSubmit={e => this.onSubmit(e, company)}
                     >
                        {fields}
                        <button className="ui green basic button">
                           <i className="material-icons">save</i>
                           Save
                        </button>
                     </form>
                  </div>
                  <div className="ten wide column">
                     <Toolbar
                        newOrder={() => this.toggleModal("newOrderModal")}
                     />
                     <Orders
                        orders={orders}
                        rowClick={this.handleOrderRowClick}
                     />
                     <div className="ui two cards">
                        <PrimaryContact
                           {...company.primaryContact}
                           removeButton={() =>
                              this.removePrimaryContact(company)
                           }
                        />
                        <Contacts
                           contacts={company.contacts || []}
                           addButton={() => this.toggleModal("addContactModal")}
                           removeButton={id => this.removeContact(id, company)}
                           makePrimaryButton={this.makePrimaryContact}
                        />
                     </div>
                  </div>
                  <AddContactModal
                     isOpen={addContactModal}
                     toggle={() => this.toggleModal("addContactModal")}
                     submit={this.addContact}
                     value={modalInput}
                     onChange={e =>
                        this.setState({ modalInput: e.target.value })
                     }
                  />
                  <NewOrderModal
                     contacts={contacts}
                     isOpen={newOrderModal}
                     toggle={() => this.toggleModal("newOrderModal")}
                     selectedID={selectedContactID}
                     onSelect={ID => this.setState({ selectedContactID: ID })}
                     submit={this.newOrder}
                  />
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const { companyID } = ownProps.match.params;
   const orders = state.orders.filter(el => el.companyID === +companyID);
   return {
      companies: state.companies,
      companyID,
      orders
   };
}

export default connect(
   mapStateToProps,
   {
      fetchCompany,
      updateCompany,
      companyInputChange,
      addCompanyContact,
      removeCompanyContact,
      fetchClientByID_v2,
      createOrder,
      fetchCompanyOrders,
      toggleModalV2
   }
)(CompanyForm);
