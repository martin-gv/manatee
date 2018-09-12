import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchClient, loadClients } from "../../../store/actions/clients";
import {
   resetDataLoadedStatus,
   setDataLoadedStatus,
   fetchClientTag
} from "../../../store/actions/system";

import ClientSearch from "../Search";
import ClientSearchByTag from "../SearchByTag";
import ClientListItem from "./ListItem";

class ClientList extends Component {
   async componentDidMount() {
      const res = await this.props.fetchClient();
      this.props.loadClients(res);
      this.props.setDataLoadedStatus("clientList");

      this.props.fetchClientTag();
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("clientList");
   }

   openClientFile = id => {
      this.props.history.push(`/clients/${id}`);
   };

   render() {
      if (!this.props.isDataLoaded) {
         return <div className="alert alert-primary">Loading...</div>;
      }

      const clientList = this.props.clients.map(c => {
         return (
            <ClientListItem
               key={c.clientId}
               client={c}
               handleRowClick={() => this.openClientFile(c.clientId)}
            />
         );
      });

      return (
         <div className="card">
            <div className="card-header">
               <div className="row">
                  <div className="col">
                     <ClientSearch />
                  </div>
                  <div className="col">
                     <ClientSearchByTag data={this.props.clientTagOptions} />
                  </div>
               </div>
            </div>
            <div className="card-body">
               <table className="table table-hover">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                     </tr>
                  </thead>
                  <tbody>{clientList}</tbody>
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
      clientTagOptions: state.system.clientTagOptions
   };
}

export default connect(
   mapStateToProps,
   {
      fetchClient,
      loadClients,
      setDataLoadedStatus,
      resetDataLoadedStatus,
      fetchClientTag
   }
)(ClientList);
