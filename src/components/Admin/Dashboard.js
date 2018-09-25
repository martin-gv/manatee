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
import { createUser, fetchUser, loadUsers } from "../../store/actions/users";

class AdminDashboard extends React.Component {
   state = {
      loading: false,
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: ""
   };

   async componentDidMount() {
      const res = await this.props.fetchUser();
      this.props.loadUsers(res);
   }

   reset = () => {
      this.setState({
         loading: false,
         firstName: "",
         lastName: "",
         email: "",
         username: "",
         password: ""
      });
   };

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
      while (n < 100) {
         const clientID = n + 1;
         client.push({
            clientID,
            firstName: f.name.firstName(),
            lastName: f.name.lastName(),
            phone: this.randomPhoneNum(),
            email: f.internet.email().toLocaleLowerCase(),
            address: f.address.streetAddress(),
            city: f.address.city(),
            province: f.address.stateAbbr(),
            postalCode: f.address.zipCode(),
            country: "Canada"
         });
         n++;
      }
      await this.props.createClient({ client });
   };

   randomPhoneNum = () => {
      const phone = Number(
         Math.random()
            .toString()
            .slice(2, 11)
      );
      return phone;
   };

   onChange = (field, value) => {
      this.setState({ [field]: value });
   };

   createUser = async e => {
      e.preventDefault();
      this.setState({ loading: true });
      await this.props.createUser({
         firstName: this.state.firstName,
         lastName: this.state.lastName,
         email: this.state.email,
         username: this.state.username,
         password: this.state.password
      });
      const res = await this.props.fetchUser();
      this.props.loadUsers(res);
      this.reset();
   };

   render() {
      const { users } = this.props;

      return (
         <div className="card full-height">
            <h2>Admin Dashboard</h2>
            <div style={{ marginTop: 10 }}>
               <button
                  className="ui basic button"
                  onClick={this.props.generateInventory}
               >
                  Generate Inventory
               </button>
               <button className="ui basic button" onClick={this.orders}>
                  Orders
               </button>
               <button className="ui basic button" onClick={this.clients}>
                  Clients
               </button>
               <div className="ui grid">
                  <div className="nine wide column">
                     <div className="section">
                        <h3 style={{ marginBottom: 20 }}>Add New User</h3>
                        <form
                           className="ui form"
                           onSubmit={this.createUser}
                           style={{ marginTop: 30 }}
                        >
                           <div className="field">
                              <label>First Name</label>
                              <input
                                 type="text"
                                 name="firstName"
                                 value={this.state.firstName}
                                 onChange={({ target: t }) =>
                                    this.onChange(t.name, t.value)
                                 }
                              />
                           </div>
                           <div className="field">
                              <label>Last Name</label>
                              <input
                                 type="text"
                                 name="lastName"
                                 value={this.state.lastName}
                                 onChange={({ target: t }) =>
                                    this.onChange(t.name, t.value)
                                 }
                              />
                           </div>
                           <div className="field">
                              <label>Email</label>
                              <input
                                 type="email"
                                 name="email"
                                 value={this.state.email}
                                 onChange={({ target: t }) =>
                                    this.onChange(t.name, t.value)
                                 }
                              />
                           </div>
                           <div className="field">
                              <label>Username</label>
                              <input
                                 type="text"
                                 name="username"
                                 value={this.state.username}
                                 onChange={({ target: t }) =>
                                    this.onChange(t.name, t.value)
                                 }
                              />
                           </div>
                           <div className="field">
                              <label>Password</label>
                              <input
                                 type="password"
                                 name="password"
                                 value={this.state.password}
                                 onChange={({ target: t }) =>
                                    this.onChange(t.name, t.value)
                                 }
                              />
                           </div>
                           <button
                              className={
                                 "ui button" +
                                 (this.state.loading ? " loading" : "")
                              }
                           >
                              Submit
                           </button>
                        </form>
                     </div>
                  </div>
                  <div className="seven wide column">
                     <div className="section">
                        <h3 style={{ marginBottom: 20 }}>Users</h3>
                        {!users.length ? (
                           <div className="loader">Loading...</div>
                        ) : (
                           <table
                              className="small"
                              style={{ marginBottom: 10 }}
                           >
                              <tbody>
                                 {users.map(user => {
                                    return (
                                       <tr key={user._id}>
                                          <td
                                             style={{ width: 75 }}
                                             style={{ padding: "12px 0" }}
                                          >
                                             <strong>{user.username}</strong>
                                             <br />
                                             {user.firstName} {user.lastName}
                                             <br />
                                             {user.email}
                                          </td>
                                       </tr>
                                    );
                                 })}
                              </tbody>
                           </table>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      users: state.users.users
   };
}

export default connect(
   mapStateToProps,
   {
      createClient,
      generateClients,
      generateInventory,
      generateOrder,
      generateRow,
      updateOrder,
      createUser,
      fetchUser,
      loadUsers
   }
)(AdminDashboard);
