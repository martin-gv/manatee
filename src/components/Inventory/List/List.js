import React from "react";
import { connect } from "react-redux";
import { Motion, spring as $ } from "react-motion";
import "./InventoryList.css";

import {
   editInventory,
   fetchInventory,
   searchInventory
} from "../../../store/actions/inventory";
import {
   resetDataLoadedStatus,
   toggleModalV2
} from "../../../store/actions/system";

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
      // return JSON.stringify(selection);
      return selection;
   };

   checkboxClick = e => {
      e.stopPropagation();
      this.closeSelectedItemPanel();
   };

   priceTags = e => {
      if (!this.checked().length) {
         e.preventDefault();
         this.props.toggleModalV2(
            true,
            "Oops!",
            "Please select at least 1 item"
         );
      }
   };

   render() {
      const { showAddNewPanel, selectedItemID } = this.state;
      const { inventoryList } = this.props.isDataLoaded;

      const tableRows = this.props.inventory.map(el => (
         <InventoryListItem
            key={el._id}
            {...el}
            selectedItemID={this.state.selectedItemID}
            handleRowClick={() => this.handleRowClick(el.inventoryID)}
            onChange={this.onChange}
            checkboxClick={this.checkboxClick}
         />
      ));

      const loader = <div className="loader">Loading...</div>;

      return (
         <div style={{ display: "flex", alignItems: "flex-start" }}>
            <Motion style={{ x: $(showAddNewPanel ? 0 : -280) }}>
               {style => (
                  <InventoryNew
                     style={{ transform: `translateX(${style.x}px)` }}
                  />
               )}
            </Motion>

            <Motion
               style={{
                  xLeft: $(showAddNewPanel ? 0 : -240),
                  xRight: $(selectedItemID ? 0 : -290)
               }}
            >
               {style => (
                  <div
                     className="card full-height InventoryList"
                     style={{
                        flex: 1,
                        marginLeft: style.xLeft,
                        marginRight: style.xRight
                     }}
                  >
                     <h2>Inventory</h2>
                     <div className="section">
                        <form
                           onSubmit={this.handleSearch}
                           style={{
                              display: "inline-block",
                              width: 300,
                              marginRight: 20
                           }}
                        >
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
                           className="ui basic blue button"
                           onClick={this.handleAddNewInventoryButton}
                        >
                           Add New
                        </button>
                        <form
                           action="/api/inventory/print"
                           method="post"
                           style={{
                              display: "inline-block",
                              margin: "0 20px 0 10px"
                           }}
                        >
                           <input
                              type="hidden"
                              name="inventory"
                              defaultValue={JSON.stringify(this.checked())}
                           />
                           <button
                              className="ui basic button"
                              onClick={this.priceTags}
                           >
                              <i className="download icon" />
                              Price Tags
                           </button>
                        </form>
                        {this.state.previousSearch && (
                           <div style={{ display: "inline-block" }}>
                              Showing search results for:{" "}
                              <strong>{this.state.previousSearch}</strong>
                           </div>
                        )}
                     </div>
                     {!inventoryList ? (
                        loader
                     ) : (
                        <table
                           className="hover clickable"
                           style={{ marginTop: 30 }}
                        >
                           <thead>
                              <tr>
                                 <th style={{ width: 60 }} />
                                 <th style={{ width: 100 }}>ID</th>
                                 <th style={{ width: 250 }}>Artist</th>
                                 <th>Title</th>
                                 <th>Type</th>
                              </tr>
                           </thead>
                           <tbody>
                              {this.props.isDataLoaded.inventoryListRows ? (
                                 tableRows
                              ) : (
                                 <tr>
                                    <td colSpan="5">{loader}</td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     )}
                  </div>
               )}
            </Motion>

            <Motion
               style={{
                  x: $(this.state.selectedItemID ? 0 : 350),
                  opacity: $(this.state.selectedItemID ? 1 : 0)
               }}
            >
               {style => (
                  <InventoryForm
                     style={{
                        transform: `translateX(${style.x}px)`,
                        opacity: style.opacity
                     }}
                     selectedItemID={this.state.selectedItemID}
                     closePanel={this.closeSelectedItemPanel}
                  />
               )}
            </Motion>
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
      resetDataLoadedStatus,
      toggleModalV2
   }
)(InventoryList);
