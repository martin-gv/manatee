import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
   fetchClientOrders,
   createOrder,
   deleteOrder
} from "../../../../store/actions/orders";
import { resetDataLoadedStatus } from "../../../../store/actions/system";

import ClientOrderListItem from "./ListItem";

class ClientOrderList extends React.Component {
   componentDidMount() {
      this.props.fetchClientOrders(this.props.clientId);
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("clientOrderList");
   }

   handleNewOrderButton = () => {
      this.props.createOrder(this.props.clientId);
   };

   handleRowClick = id => {
      this.props.history.push(`/orders/${id}`);
   };

   handleDeleteButton = (e, id) => {
      e.stopPropagation();
      this.props.deleteOrder(id);
   };

   render() {
      if (!this.props.isDataLoaded) {
         return <div className="alert alert-primary">Loading...</div>;
      }

      const clientOrderList = this.props.orders.map(o => {
         return (
            <ClientOrderListItem
               key={o.orderID}
               {...o}
               handleRowClick={() => this.handleRowClick(o.orderID)}
               handleDeleteButton={e => this.handleDeleteButton(e, o.orderID)}
            />
         );
      });

      return (
         <div className="card">
            <div className="card-header">
               Client Orders
               <button
                  className="btn btn-primary float-right"
                  onClick={this.handleNewOrderButton}
               >
                  New Order
               </button>
            </div>
            <div className="card-body">
               <table className="table table-hover">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th></th>
                        <th>Title</th>
                        <th>Description</th>
                        <th />
                     </tr>
                  </thead>
                  <tbody>{clientOrderList}</tbody>
               </table>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      orders: state.orders,
      isDataLoaded: state.system.isDataLoaded.clientOrderList
   };
}

export default withRouter(
   connect(
      mapStateToProps,
      { fetchClientOrders, createOrder, deleteOrder, resetDataLoadedStatus }
   )(ClientOrderList)
);
