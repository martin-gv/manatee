import React from "react";
import { connect } from "react-redux";

import {
   fetchCompany,
   updateCompany,
   editCompany,
   addCompanyContact,
   removeCompanyContact
} from "../../../store/actions/companies";
import { fetchClientByID_v2 } from "../../../store/actions/clients";
import { createOrder, fetchCompanyOrders } from "../../../store/actions/orders";
import { toggleModalV2 } from "../../../store/actions/system";

import { found, findByID } from "../../../utility/utility";

import CompanyInfo from "./CompanyInfo/CompanyInfo";
import PrimaryContact from "./PrimaryContact";
import Contacts from "./Contacts";
import Orders from "./CompanyOrders/CompanyOrders";
import AddContactModal from "./AddContactModal";
import NewOrderModal from "./CompanyOrders/NewOrderModal";
import Toolbar from "./Toolbar";

const form = [
   { name: "name", label: "Name" },
   { name: "address", label: "Address" },
   { name: "city", label: "City" },
   { name: "province", label: "Province" },
   { name: "country", label: "Country" },
   { name: "postalCode", label: "Postal Code" }
];

class CompanyForm extends React.Component {
   state = {
      ready: false,
      ordersReady: false,
      addContactModal: false,
      modalInput: "",
      newOrderModal: false,
      selectedContactID: ""
   };

   componentDidMount() {
      const { companyID } = this.props.match.params;
      this.props
         .fetchCompany(companyID)
         .then(ready => (ready ? this.setState({ ready }) : null));
      this.props.fetchCompanyOrders(companyID).then(res => {
         if (found(res)) this.setState({ ordersReady: true });
      });
   }

   onChange = (field, value) => {
      const { companyID } = this.props;
      this.props.editCompany(companyID, field, value);
   };

   onSubmit = (e, data) => {
      e.preventDefault();
      this.props.updateCompany(data);
   };

   toggleModal = modal => {
      this.setState({ [modal]: !this.state[modal] });
   };

   addContact = e => {
      e.preventDefault();
      const id = this.state.modalInput;
      this.props.fetchClientByID_v2(id).then(res => {
         if (found(res)) {
            const { companyID, companies } = this.props;
            const client = findByID(res, "clientID", id);
            const company = findByID(companies, "companyID", companyID);
            this.props
               .updateCompany({
                  companyID,
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
      const data = { companyID, $pull: { contacts: id } };
      const { primaryContact } = company;
      if (primaryContact !== null && primaryContact._id === id)
         data.primaryContact = null;
      this.props.updateCompany(data).then(success => {
         if (success) this.props.removeCompanyContact(companyID, id);
         if (primaryContact !== null && primaryContact._id === id) {
            this.props.editCompany(companyID, "primaryContact", null);
         }
      });
   };

   makePrimaryContact = client => {
      const { companyID } = this.props;
      const data = { companyID, primaryContact: client._id };
      this.props.updateCompany(data).then(success => {
         if (success)
            this.props.editCompany(companyID, "primaryContact", client);
      });
   };

   removePrimaryContact = async () => {
      const { companyID } = this.props;
      const success = await this.props.updateCompany({
         companyID,
         primaryContact: null
      });
      if (success) this.props.editCompany(companyID, "primaryContact", null);
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

   viewOrder = id => {
      this.props.history.push("/orders/" + id);
   };

   render() {
      const {
         ready,
         ordersReady,
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

      let loader = null;
      if (!ready) {
         loader = <div className="loader">Loading...</div>;
      }

      return (
         <div className="card full-height">
            {loader}
            {ready && (
               <div>
                  <div className="ui grid">
                     <div className="eleven wide column">
                        <h2>{company.name}</h2>
                     </div>
                     <div className="five wide column">
                        <Toolbar
                           newOrder={() => this.toggleModal("newOrderModal")}
                        />
                     </div>
                  </div>
                  <div className="ui grid">
                     <div className="five wide column">
                        <CompanyInfo
                           form={form}
                           onSubmit={this.onSubmit}
                           onChange={this.onChange}
                           company={company}
                        />
                     </div>
                     <div className="eleven wide column">
                        <Orders orders={orders} rowClick={this.viewOrder} />
                        <div className="ui grid">
                           <div
                              className="seven wide column"
                              style={{ paddingRight: 0 }}
                           >
                              <PrimaryContact
                                 {...company.primaryContact}
                                 remove={this.removePrimaryContact}
                              />
                           </div>
                           <div
                              className="nine wide column"
                              style={{ paddingLeft: 0 }}
                           >
                              <Contacts
                                 contacts={company.contacts || []}
                                 addButton={() =>
                                    this.toggleModal("addContactModal")
                                 }
                                 removeButton={id =>
                                    this.removeContact(id, company)
                                 }
                                 makePrimaryButton={this.makePrimaryContact}
                              />
                           </div>
                        </div>
                     </div>
                     <AddContactModal
                        open={addContactModal}
                        toggle={() => this.toggleModal("addContactModal")}
                        submit={this.addContact}
                        value={modalInput}
                        onChange={e =>
                           this.setState({ modalInput: e.target.value })
                        }
                     />
                     <NewOrderModal
                        contacts={contacts}
                        open={newOrderModal}
                        toggle={() => this.toggleModal("newOrderModal")}
                        selectedID={selectedContactID}
                        onSelect={ID =>
                           this.setState({ selectedContactID: ID })
                        }
                        submit={this.newOrder}
                     />
                  </div>
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
      editCompany,
      addCompanyContact,
      removeCompanyContact,
      fetchClientByID_v2,
      createOrder,
      fetchCompanyOrders,
      toggleModalV2
   }
)(CompanyForm);
