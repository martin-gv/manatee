import f from "faker";
import moment from "moment";

import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { toggleModalV2 } from "./system";

export const generateClients = async () => {
   //    const client = []; // array of clients
   //    let n = 0;
   //    while (n < 100) {
   //       const clientId = n + 1;
   //       client.push({
   //          clientId,
   //          firstName: f.name.firstName,
   //          lastName: f.name.lastName,
   //          phone: f.phone.phoneNumberFormat,
   //          email: f.internet.email
   //       });
   //       n++;
   //    }
   //    const res = await createClient({ client });
   //    console.log(res);
};

export function generateInventory(quantity) {
   const items = [];
   for (let i = 0; i < 1000; i++) {
      let item = {
         title: f.commerce.productName(),
         artist: `${f.name.firstName()} ${f.name.lastName()}`,
         type: "",
         medium: "",
         price: f.commerce.price()
      };
      items.push(item);
   }

   return dispatch => {
      return apiCall("post", `/api/inventory`, { inventory: items })
         .then(res => {
            dispatch(removeError());
            dispatch(
               toggleModalV2(true, "New Inventory Items Created", res.length)
            );
         })
         .catch(err => {
            dispatch(addError(err.message));
         });
   };
}

export function generateOrder(quantity) {
   const clientID = 6;
   const orders = [];
   const date = moment();

   var i = 0;
   while (i < 10) {
      const createdAt = date.subtract(1, "day").toDate();
      orders.push({ clientID, createdAt });
      i++;
   }
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
