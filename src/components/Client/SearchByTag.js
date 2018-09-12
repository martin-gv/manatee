import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { fetchClient, loadClients } from "../../store/actions/clients";

class ClientSearchByTag extends React.Component {
   state = {
      selectedOption: []
   };

   handleSearch = async () => {
      const tagSearch = this.state.selectedOption.map(el => el.value._id);
      const res = await this.props.fetchClient(null, tagSearch);
      this.props.loadClients(res);
   };

   render() {
      const tagOptions = this.props.data.map(el => ({
         label: `${el.category} -> ${el.name}`,
         value: el
      }));

      return (
         <div className="row">
            <div className="col-8">
               <Select
                  options={tagOptions}
                  onChange={selectedOption => this.setState({ selectedOption })}
                  value={this.state.selectedOption}
                  placeholder="Search by tag"
                  multi
               />
            </div>
            <div className="col">
               <button
                  className="btn btn-primary btn-block"
                  onClick={this.handleSearch}
                  // disabled={!this.state.selectedOption}
               >
                  Search
               </button>
            </div>
         </div>
      );
   }
}

export default connect(
   null,
   { fetchClient, loadClients }
)(ClientSearchByTag);
