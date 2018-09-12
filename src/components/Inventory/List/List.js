import React from "react";
import { connect } from "react-redux";

import {
   editInventory,
   fetchInventory,
   searchInventory
} from "../../../store/actions/inventory";
import { resetDataLoadedStatus } from "../../../store/actions/system";

import InventoryNew from "../New";
import InventoryListItem from "./ListItem";
import InventoryForm from "../Form";

class InventoryList extends React.Component {
   state = {
      searchBox: "",
      previousSearch: "",
      showAddNewPanel: false,
      selectedItemID: null
   };

   componentDidMount() {
      this.props.fetchInventory();
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("inventoryList");
   }

   handleSearchBoxChange = e => {
      this.setState({ searchBox: e.target.value });
   };

   handleSearch = e => {
      e.preventDefault();
      this.setState({
         searchBox: "",
         previousSearch: this.state.searchBox,
         selectedItemID: null
      });
      this.props.searchInventory(this.state.searchBox);
   };

   handleAddNewInventoryButton = () => {
      this.setState({ showAddNewPanel: !this.state.showAddNewPanel });
   };

   handleRowClick = id => {
      this.setState({ selectedItemID: id });
   };

   closeSelectedItemPanel = () => {
      this.setState({ selectedItemID: null });
   };

    onChange = (inventoryID, field, value) => {
      this.props.editInventory(inventoryID, field, value);
   };

   checked = () => {
      const selection = this.props.inventory.filter(el => el.checked);
      return JSON.stringify(selection);
   };

   render() {
      if (!this.props.isDataLoaded.inventoryList) {
         return <div className="alert alert-primary">Loading...</div>;
      }

      const tableRows = this.props.inventory.map(el => (
         <InventoryListItem
            key={el._id}
            {...el}
            selectedItemID={this.state.selectedItemID}
            handleRowClick={() => this.handleRowClick(el.inventoryID)}
            onChange={this.onChange}
         />
      ));

      return (
         <div className="row">
            {this.state.showAddNewPanel && (
               <div className="col-3">
                  <InventoryNew />
               </div>
            )}
            <div className="col">
               <div className="card">
                  <div className="card-header">Inventory List</div>
                  <div className="card-body">
                     <div className="card">
                        <div className="card-body">
                           <div className="form-row">
                              <div className="col">
                                 <form onSubmit={this.handleSearch}>
                                    <div className="input-group">
                                       <input
                                          className="form-control"
                                          type="text"
                                          placeholder="Search inventory..."
                                          value={this.state.searchBox}
                                          onChange={this.handleSearchBoxChange}
                                       />
                                       <div className="input-group-append">
                                          <button className="btn btn-primary">
                                             Search
                                          </button>
                                       </div>
                                    </div>
                                 </form>
                                 <button
                                    className="btn btn-primary mt-3"
                                    onClick={this.handleAddNewInventoryButton}
                                 >
                                    Add New
                                 </button>
                                 <form
                                    action="/api/inventory/print"
                                    method="post"
                                 >
                                    <input
                                       type="hidden"
                                       name="inventory"
                                       defaultValue={this.checked()}
                                    />
                                    <button className="ui basic button">
                                       <i className="download icon" />
                                       Price Tags
                                    </button>
                                 </form>
                              </div>
                              <div className="col">
                                 {this.state.previousSearch && (
                                    <div>
                                       Showing search results for:{" "}
                                       <strong>
                                          {this.state.previousSearch}
                                       </strong>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                     <table className="table table-hover clickable">
                        <thead>
                           <tr>
                              <th />
                              <th>ID</th>
                              <th>Artist</th>
                              <th>Title</th>
                              <th>Type</th>
                           </tr>
                        </thead>
                        <tbody>
                           {this.props.isDataLoaded.inventoryListRows ? (
                              tableRows
                           ) : (
                              <tr>
                                 <td colSpan="4">
                                    <div className="alert alert-primary">
                                       Loading...
                                    </div>
                                 </td>
                              </tr>
                           )}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
            {this.state.selectedItemID && (
               <div className="col-3">
                  <InventoryForm
                     selectedItemID={this.state.selectedItemID}
                     closePanel={this.closeSelectedItemPanel}
                  />
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      inventory: state.inventory,
      isDataLoaded: state.system.isDataLoaded
   };
}

export default connect(
   mapStateToProps,
   {
      editInventory,
      fetchInventory,
      searchInventory,
      // printInventory,
      resetDataLoadedStatus
   }
)(InventoryList);
