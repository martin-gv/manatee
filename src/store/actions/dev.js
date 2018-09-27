import f from "faker";
import moment from "moment";

import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { toggleModalV2 } from "./system";

export function generateInventory(quantity) {
   const items = [];
   for (let i = 0; i < 1000; i++) {
      let item = {
         title: f.commerce.productName(),
         artist: `${f.name.firstName()} ${f.name.lastName()}`,
         type: f.commerce.department(),
         medium: f.commerce.product(),
         price: f.commerce.price()
      };
      items.push(item);
   }

   return dispatch => {
      return apiCall("post", "/api/inventory", { inventory: items })
         .then(res => {
            dispatch(removeError());
            dispatch(toggleModalV2(true, "Done", "1000 new items created"));
            return;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function generateOrder(clients) {
   const orders = [];
   const date = moment();

   clients.forEach(client => {
      const num = Math.floor(Math.random() * 3 + 1);
      let i = 0;
      while (i < num) {
         const createdAt = date.subtract(1, "day").toDate();
         orders.push({ clientID: client.clientID, createdAt });
         i++;
      }
   });

   orders.reverse();

   return dispatch => {
      return apiCall("post", "/api/orders", { orders })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function generatePayments(orders) {
   const payments = [];
   orders.forEach(order => {
      const numberOfPayments = Math.floor(Math.random() * 2 + 1);
      const orderDate = moment(order.createdAt);
      let i = 0;
      while (i < numberOfPayments) {
         // first payment is made when order is placed
         let datePaid = orderDate;
         const paymentNum = i + 1;
         if (i !== 0) {
            // additional payments are made 1 - 3 weeks after
            const randNumOfDays = Math.floor(Math.random() * 14 + 7);
            datePaid = orderDate.add(randNumOfDays, "day").toDate();
         }
         const amountPaid = Math.floor(Math.random() * 200 + 100);
         payments.push({
            orderID: order.orderID,
            paymentNum,
            amountPaid,
            datePaid
         });
         i++;
      }
   });

   return dispatch => {
      return apiCall("post", "/api/payments", { payment: payments })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function generateRow(data) {
   return dispatch => {
      return apiCall("post", "/api/order_rows", { row: data })
         .then(res => {
            dispatch(removeError());
            return res;
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}
