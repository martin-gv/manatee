import React, { Component } from "react";
import { connect } from "react-redux";
import { found, findByID } from "../../../utility/utility";

import {
   fetchClientById,
   updateClient,
   saveClient,
   deleteClient,
   loadClients,
   editClient
} from "../../../store/actions/clients";
import { fetchCompany } from "../../../store/actions/companies";
import {
   resetDataLoadedStatus,
   toggleModal,
   toggleModalV2
} from "../../../store/actions/system";

import Header from "./ClientFormHeader";
import Info from "./ClientInfo/ClientInfo";
import Orders from "./ClientOrders/ClientOrders";
import ClientTags from "../Tags/ClientTags";
import Modal from "../../UI/Modal/Modal";
import SecureNotesModal from "./SecureNotesModal";
import RewardsModal from "./RewardsModal";
import Company from "./ClientCompany/ClientCompany";
import ClientCompanyModal from "./ClientCompany/ClientCompanyModal";

class ClientForm extends Component {
   state = {
      ready: false,
      id: null,
      modal: {
         secure: false,
         company: false,
         rewards: false
      },
      inputCompany: ""
   };

   static getDerivedStateFromProps(props, state) {
      const prev = state.id;
      const current = props.match.params.clientID;
      if (prev !== current) {
         return {
            ready: false,
            id: current
         };
      }
      return null;
   }

   componentDidMount() {
      const id = this.props.match.params.clientID;
      this.fetchData(id);
   }

   async componentDidUpdate(prevProps) {
      const prev = prevProps.match.params.clientID;
      const current = this.props.match.params.clientID;
      if (prev !== current) {
         this.fetchData(current);
      }
   }

   fetchData = async id => {
      const res = await this.props.fetchClientById(id);
      this.props.loadClients(res);
      this.setState({ ready: true });
   };

   onChange = (field, value) => {
      const { clientID } = this.props.client;
      this.props.editClient(clientID, field, value);
   };

   handleChange = e => {
      const id = this.props.client.clientId;
      this.props.updateClient(id, e);
   };

   saveClient = e => {
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
      this.saveClient(e);
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
      const { ready, modal, inputCompany } = this.state;
      const { client } = this.props;
      const { clientID, company, tags, notes } = client || {};
      const cssAnimate = ["animated", ready ? "fade-visible" : "fade-hidden"];

      let loader = null;
      if (!ready) {
         loader = <div className="loader">Loading...</div>;
      }

      return (
         <div className="card full-height">
            {loader}
            <div className={cssAnimate.join(" ")}>
               <Header
                  client={client || {}}
                  toggleModal={this.toggleModal}
                  addButton={() => this.toggleModal("company")}
                  company={company || {}}
               />
               <div className="ui grid ">
                  <div className="seven wide column">
                     <Info
                        client={client}
                        onChange={this.onChange}
                        onSubmit={this.saveClient}
                     />
                     <Company
                        removeButton={this.removeCompany}
                        viewButton={this.viewCompany}
                        company={company || {}}
                     />
                  </div>
                  <div
                     className="nine wide column"
                     style={{ position: "relative", top: "-50px" }}
                  >
                     <Orders clientID={clientID} />
                     <ClientTags clientID={clientID} tags={tags || []} />
                     <div
                        style={{
                           marginTop: "20px",
                           border: "1px solid #ddd",
                           padding: "20px",
                           borderRadius: "5px"
                        }}
                     >
                        Notes
                        <form className="ui form">
                           <div className="field">
                              <textarea
                                 name="notes"
                                 value={notes}
                                 rows="5"
                                 onChange={({ target }) =>
                                    this.onChange(target.name, target.value)
                                 }
                              />
                           </div>
                        </form>
                     </div>
                  </div>
               </div>
               <Modal
                  isOpen={this.props.showSaveConfirmation}
                  toggle={() =>
                     this.props.toggleModal("clientSaveConfirmation")
                  }
                  title="Success!"
               >
                  Changes saved succesfully
               </Modal>
               <SecureNotesModal
                  isOpen={modal.secure}
                  toggle={this.toggleModal}
                  submit={this.saveSecureNotes}
                  client={client || {}}
                  onChange={this.handleChange}
               />
               <ClientCompanyModal
                  isOpen={modal.company}
                  toggle={this.toggleModal}
                  value={inputCompany}
                  onChange={e =>
                     this.setState({ inputCompany: e.target.value })
                  }
                  submit={this.addCompany}
               />
               <RewardsModal
                  isOpen={modal.rewards}
                  toggle={this.toggleModal}
                  client={client}
               />
            </div>
         </div>
      );
   }
}

function mapStateToProps(state, ownProps) {
   const id = ownProps.match.params.clientID;
   const client = state.clients.find(obj => obj.clientID === +id);
   return {
      client,
      showSaveConfirmation: state.system.showModal.clientSaveConfirmation
   };
}

export default connect(
   mapStateToProps,
   {
      fetchClientById,
      editClient,
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
