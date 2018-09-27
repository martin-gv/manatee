import React, { Component } from "react";
import { connect } from "react-redux";
import "./ClientList.css";

import { fetchClient, loadClients } from "../../../store/actions/clients";
import {
   resetDataLoadedStatus,
   setDataLoadedStatus,
   fetchTag
} from "../../../store/actions/system";

import Toolbar from "./Toolbar";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import NewClientModal from "../NewClientModal";

class ClientList extends Component {
   state = {
      newClientModal: false
   };

   async componentDidMount() {
      const res = await this.props.fetchClient();
      this.props.loadClients(res);
      this.props.setDataLoadedStatus("clientList");
      this.props.fetchTag();
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("clientList");
   }

   viewClient = id => {
      this.props.history.push("/clients/" + id);
   };

   toggleModal = modal => {
      this.setState({ [modal]: !this.state[modal] });
   };

   render() {
      const { isDataLoaded, clients } = this.props;
      const cssAnimate = isDataLoaded ? "fade-visible" : "fade-hidden";

      const loader = <div className="loader">Loading...</div>;

      return (
         <div className="ClientList card full-height">
            <Toolbar
               tagData={this.props.tagData}
               toggleModal={this.toggleModal}
            />
            {!isDataLoaded && loader}
            <div className={"animated " + cssAnimate} style={{ marginTop: 20 }}>
               <table className="hover clickable">
                  <TableHead />
                  <TableBody clients={clients} onRowClick={this.viewClient} />
               </table>
            </div>
            <NewClientModal
               open={this.state.newClientModal}
               toggle={() => this.toggleModal("newClientModal")}
            />
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      clients: state.clients,
      isDataLoaded: state.system.isDataLoaded.clientList,
      tagData: state.system.tagData
   };
}

export default connect(
   mapStateToProps,
   {
      fetchClient,
      loadClients,
      setDataLoadedStatus,
      resetDataLoadedStatus,
      fetchTag
   }
)(ClientList);
