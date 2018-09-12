import React from "react";
import { connect } from "react-redux";

import { fetchClient, loadClients } from "../../store/actions/clients";
import {
   resetDataLoadedStatus,
   setDataLoadedStatus
} from "../../store/actions/system";

class ClientSearch extends React.Component {
   state = {
      input: ""
   };

   onChange = e => {
      this.setState({ input: e.target.value });
   };

   onSearch = async e => {
      e.preventDefault();
      
      this.props.resetDataLoadedStatus("clientList");
      const res = await this.props.fetchClient(this.state.input);
      this.props.loadClients(res);
      this.props.setDataLoadedStatus("clientList");

      this.setState({ input: "" });
   };

   render() {
      return (
         <form onSubmit={this.onSearch}>
            <div className="input-group">
               <input
                  className="form-control"
                  type="text"
                  placeholder="Search by client info..."
                  value={this.state.input}
                  onChange={this.onChange}
               />
               <div className="input-group-append">
                  <button className="btn btn-primary">Search</button>
               </div>
            </div>
         </form>
      );
   }
}

export default connect(
   null,
   { fetchClient, loadClients, resetDataLoadedStatus, setDataLoadedStatus }
)(ClientSearch);
