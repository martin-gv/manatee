import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
   fetchClientOrders,
   createOrder,
   deleteOrder
} from "../../../../store/actions/orders";
import { createOrderRow } from "../../../../store/actions/orderRows";
import { resetDataLoadedStatus } from "../../../../store/actions/system";

import TableHead from "./TableHead";
import TableRow from "./TableRow";

class ClientOrderList extends React.Component {
   state = {
      newOrderLoading: false
   };

   componentDidMount() {
      this.props.fetchClientOrders(this.props.clientID);
   }

   componentWillUnmount() {
      this.props.resetDataLoadedStatus("clientOrderList");
   }

   handleNewOrderButton = async () => {
      this.setState({ newOrderLoading: true });
      const res = await this.props.createOrder(this.props.clientID);
      await this.props.createOrderRow(res.orderID, 1);
      this.props.history.push("/orders/" + res.orderID);
   };

   handleRowClick = id => {
      this.props.history.push("/orders/" + id);
   };

   handleDeleteButton = (e, id) => {
      e.stopPropagation();
      this.props.deleteOrder(id);
   };

   render() {
      if (!this.props.isDataLoaded) {
         return null;
      }

      const loading = this.state.newOrderLoading ? " loading" : "";
      const clientOrderList = this.props.orders.map(o => {
         return (
            <TableRow
               key={o.orderID}
               {...o}
               handleRowClick={() => this.handleRowClick(o.orderID)}
               handleDeleteButton={e => this.handleDeleteButton(e, o.orderID)}
            />
         );
      });

      return (
         <div>
            <button
               style={{ float: "right", position: "relative", top: "10px" }}
               className={"ui primary button " + loading}
               onClick={this.handleNewOrderButton}
            >
               <i className="material-icons">add</i>
               New Order
            </button>
            <table className="small hover clickable">
               <TableHead />
               <tbody>{clientOrderList}</tbody>
            </table>
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
      {
         fetchClientOrders,
         createOrder,
         deleteOrder,
         resetDataLoadedStatus,
         createOrderRow
      }
   )(ClientOrderList)
);
