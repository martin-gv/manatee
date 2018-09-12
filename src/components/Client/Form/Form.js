import React, { Component } from "react";
import { connect } from "react-redux";
import { found, findByID } from "../../../utility/utility";

import {
   fetchClientById,
   updateClient,
   saveClient,
   deleteClient,
   loadClients
} from "../../../store/actions/clients";
import { fetchCompany } from "../../../store/actions/companies";
import {
   resetDataLoadedStatus,
   toggleModal,
   toggleModalV2
} from "../../../store/actions/system";

import Header from "./ClientFormHeader";
import ClientOrderList from "./ClientOrder/List";
import ClientTags from "../Tags/ClientTags";
import Modal from "../../UI/Modal/Modal";
import SecureNotesModal from "./SecureNotesModal";
import ClientCompany from "./ClientCompany/ClientCompany";
import ClientCompanyModal from "./ClientCompany/ClientCompanyModal";

class ClientForm extends Component {
   state = {
      ready: false,
      id: null,
      modal: {
         secure: false,
         company: false
      },
      inputCompany: ""
   };

   static getDerivedStateFromProps(props, state) {
      const prev = state.id;
      const current = props.match.params.id;
      if (prev !== current) {
         return {
            ready: false,
            id: current
         };
      }
      return null;
   }

   async componentDidMount() {
      const id = this.props.match.params.id;
      this.fetchData(id);
   }

   async componentDidUpdate(prevProps) {
      const prev = prevProps.match.params.id;
      const current = this.props.match.params.id;
      if (prev !== current) {
         this.fetchData(current);
      }
   }

   fetchData = async id => {
      const res = await this.props.fetchClientById(id);
      this.props.loadClients(res);
      this.setState({ ready: true });
   };

   handleChange = e => {
      const id = this.props.client.clientId;
      this.props.updateClient(id, e);
   };

   handleSubmit = e => {
      e.preventDefault();
      this.props.saveClient(this.props.client);
   };

   handleDelete = () => {
      const id = this.props.client.clientId;
      const history = this.props.history;
      this.props.deleteClient(id, history);
   };

   toggleModal = modal => {
      const m = this.state.modal;
      this.setState({ modal: { ...m, [modal]: !m[modal] } });
   };

   saveSecureNotes = e => {
      this.handleSubmit(e);
      this.toggleModal("secure");
   };

   addCompany = e => {
      e.preventDefault();
      const id = this.state.inputCompany;
      this.props.fetchCompany(id).then(res => {
         if (found(res)) {
            const { client } = this.props;
            const { clientId } = client;
            const company = findByID(res, "companyID", id);
            const data = {
               clientId,
               company: company._id,
               companyUpdate: true,
               skipPreUpdateHook: true
            };
            this.props.saveClient(data).then(res => {
               if (res) {
                  const event = { target: { name: "company", value: company } };
                  this.props.updateClient(clientId, event);
                  this.setState({ inputCompany: "" });
                  this.toggleModal("company");
               }
            });
         } else {
            this.props.toggleModalV2(true, "Error", "No company found");
         }
      });
   };

   removeCompany = () => {
      const { client } = this.props;
      const { clientId } = client;
      const data = {
         clientId,
         company: null,
         companyUpdate: true,
         skipPreUpdateHook: true
      };
      this.props.saveClient(data).then(res => {
         if (res) {
            const e = { target: { name: "company", value: null } };
            this.props.updateClient(clientId, e);
         }
      });
   };

   viewCompany = () => {
      const { companyID } = this.props.client.company;
      this.props.history.push("/companies/" + companyID);
   };

   render() {
      if (!this.state.ready) {
         return <div className="alert alert-primary">Loading...</div>;
      }

      const { modal, inputCompany } = this.state;
      const { client } = this.props;
      const { clientId, firstName, lastName, phone, email, company, tags } =
         client || {};

      return (
         <div>
            <Header client={client} toggleModal={this.toggleModal} />
            <div className="row">
               <div className="col">
                  <div className="card">
                     <div className="card-header">
                        Client Form
                        <button
                           className="btn btn-danger float-right"
                           onClick={this.handleDelete}
                        >
                           Delete
                        </button>
                     </div>
                     <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                           <div className="form-group">
                              <label htmlFor="clientId">clientId</label>
                              <input
                                 className="form-control"
                                 id="clientId"
                                 name="clientId"
                                 value={clientId}
                                 type="text"
                                 onChange={this.handleChange}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="firstName">firstName</label>
                              <input
                                 className="form-control"
                                 id="firstName"
                                 name="firstName"
                                 value={firstName}
                                 type="text"
                                 onChange={this.handleChange}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="lastName">lastName</label>
                              <input
                                 className="form-control"
                                 id="lastName"
                                 name="lastName"
                                 value={lastName}
                                 type="text"
                                 onChange={this.handleChange}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="phone">phone</label>
                              <input
                                 className="form-control"
                                 id="phone"
                                 name="phone"
                                 value={phone}
                                 type="number"
                                 step="1"
                                 min="0"
                                 max="9999999999"
                                 onChange={this.handleChange}
                              />
                           </div>
                           <div className="form-group">
                              <label htmlFor="email">email</label>
                              <input
                                 className="form-control"
                                 id="email"
                                 name="email"
                                 value={email}
                                 type="email"
                                 onChange={this.handleChange}
                              />
                           </div>
                           <button type="submit" className="btn btn-success">
                              Save
                           </button>
                        </form>
                     </div>
                  </div>
                  <ClientCompany
                     addButton={() => this.toggleModal("company")}
                     removeButton={this.removeCompany}
                     viewButton={this.viewCompany}
                     company={company || {}}
                  />
               </div>
               <div className="col">
                  <ClientOrderList clientId={client.clientId} />
                  <ClientTags clientId={clientId} tags={tags} />
               </div>
            </div>
            <Modal
               isOpen={this.props.showSaveConfirmation}
               toggle={() => this.props.toggleModal("clientSaveConfirmation")}
               title="Success!"
            >
               Changes saved succesfully
            </Modal>
            <SecureNotesModal
               isOpen={modal.secure}
               toggle={this.toggleModal}
               submit={this.saveSecureNotes}
               client={client}
               onChange={this.handleChange}
            />
            <ClientCompanyModal
               isOpen={modal.company}
               toggle={this.toggleModal}
               value={inputCompany}
               onChange={e => this.setState({ inputCompany: e.target.value })}
               submit={this.addCompany}
            />
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const id = ownProps.match.params.id;
   const client = state.clients.find(obj => obj.clientId === id);
   return {
      client,
      isDataLoaded: state.system.isDataLoaded.clientForm,
      showSaveConfirmation: state.system.showModal.clientSaveConfirmation
   };
}

export default connect(
   mapStateToProps,
   {
      fetchClientById,
      updateClient,
      saveClient,
      deleteClient,
      loadClients,
      fetchCompany,
      resetDataLoadedStatus,
      toggleModal,
      toggleModalV2
   }
)(ClientForm);
