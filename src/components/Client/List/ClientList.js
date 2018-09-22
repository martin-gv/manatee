import React, { Component } from "react";
import { connect } from "react-redux";
import "./ClientList.css";

import { fetchClient, loadClients } from "../../../store/actions/clients";
import {
   resetDataLoadedStatus,
   setDataLoadedStatus,
   fetchTag
} from "../../../store/actions/system";

// import Toolbar from "./Toolbar";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

class ClientList extends Component {
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

   render() {
      const { isDataLoaded, clients } = this.props;
      const cssAnimate = isDataLoaded ? "fade-visible" : "fade-hidden";

      let loader = null;
      if (!isDataLoaded) {
         loader = <div className="loader">Loading...</div>;
      }

      return (
         <div className="ClientList card full-height">
            {/* <Toolbar tagData={this.props.tagData} /> */}
            {loader}
            <div className={"animated " + cssAnimate}>
               <h2>Clients</h2>
               <table className="hover clickable">
                  <TableHead />
                  <TableBody clients={clients} onRowClick={this.viewClient} />
               </table>
            </div>
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
