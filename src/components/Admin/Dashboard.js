import React from "react";
import { connect } from "react-redux";
import Big from "big.js";
import f from "faker";

import { randPrice } from "../../utility/utility";

import {
   generateClients,
   generateInventory,
   generateOrder,
   generateRow
} from "../../store/actions/dev";
import { createClient } from "../../store/actions/clients";
import { updateOrder } from "../../store/actions/orders";

class AdminDashboard extends React.Component {
   orders = async () => {
      const orders = await this.props.generateOrder();
      const rowData = orders.reduce((acc, cur) => {
         const { orderID } = cur;
         let i = 1;
         while (i <= 25) {
            acc.push({
               orderID,
               rowNum: i,
               price: randPrice(250),
               framingRewards: true
            });
            i++;
         }
         return acc;
      }, []);

      const rows = await this.props.generateRow(rowData);
      const rowDictionary = rows.reduce((acc, cur) => {
         const { orderID } = cur;
         if (!acc[orderID]) acc[orderID] = [];
         acc[orderID].push(cur);
         return acc;
      }, {});

      for (const key in rowDictionary) {
         const total = rowDictionary[key].reduce((acc, cur) => {
            const sum = Big(acc).plus(
               Big(cur.price || 0).plus(Big(cur.itemPrice || 0))
            );
            return Number(sum);
         }, 0);
         const orderData = { orderID: key, total };
         this.props.updateOrder(orderData);
      }
   };

   clients = async () => {
      const client = []; // array of clients
      let n = 0;
      while (n < 10000) {
         const clientId = n + 1;
         client.push({
            clientId,
            firstName: f.name.firstName(),
            lastName: f.name.lastName(),
            phone: f.phone.phoneNumberFormat(),
            email: f.internet.email()
         });
         n++;
      }
      const res = await this.props.createClient({ client });
      console.log(res);
   };

   render() {
      return (
         <div className="card">
            <div className="card-header">Admin Dashboard</div>
            <div className="card-body">
               <button
                  className="btn btn-primary btn-lg"
                  onClick={this.props.generateInventory}
               >
                  Generate Inventory
               </button>
               <button className="ui button" onClick={this.orders}>
                  100 Orders
               </button>
               <button className="ui button" onClick={this.clients}>
                  Clients
               </button>
            </div>
         </div>
      );
   }
}

export default connect(
   null,
   {
      createClient,
      generateClients,
      generateInventory,
      generateOrder,
      generateRow,
      updateOrder
   }
)(AdminDashboard);
