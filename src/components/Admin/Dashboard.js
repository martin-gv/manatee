import React from "react";
import { connect } from "react-redux";
import Big from "big.js";
import f from "faker";

import { randPrice } from "../../utility/utility";

import {
   generateInventory,
   generateOrder,
   generateRow,
   generatePayments
} from "../../store/actions/dev";
import { createClient, fetchClient } from "../../store/actions/clients";
import { createCompany } from "../../store/actions/companies";
import { fetchOrder, updateOrder } from "../../store/actions/orders";
import { createUser, fetchUser, loadUsers } from "../../store/actions/users";
import { toggleModalV2 } from "../../store/actions/system";

class AdminDashboard extends React.Component {
   state = {
      loading: false,
      generating: false,
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
      this.setState({ generating: true });

      const clients = await this.props.fetchClient(null, null, true);
      const orders = await this.props.generateOrder(clients);
      const rowData = orders.reduce((acc, cur) => {
         const { orderID } = cur;
         let i = 1;
         while (i <= 4) {
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
         await this.props.updateOrder(orderData);
      }
      this.setState({ generating: false });
   };

   clients = async () => {
      this.setState({ generating: true });
      const clients = []; // array of clientss
      const num = 1000;
      let n = 0;
      while (n < num) {
         clients.push({
            firstName: f.name.firstName(),
            lastName: f.name.lastName(),
            phone: this.randomPhoneNum(),
            email: f.internet.email().toLocaleLowerCase(),
            address: f.address.streetAddress(),
            city: f.address.city(),
            province: f.address.stateAbbr(),
            postalCode: f.address.zipCode(),
            country: "Canada",
            notes: f.lorem.sentences(),
            secureNotes: f.lorem.sentence()
         });
         n++;
      }
      await this.props.createClient({ client: clients });
      this.props.toggleModalV2(true, "Done", `${num} new clients created`);
      this.setState({ generating: false });
   };

   inventory = async () => {
      this.setState({ generating: true });
      await this.props.generateInventory();
      this.setState({ generating: false });
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

   companies = async () => {
      this.setState({ generating: true });
      const companies = []; // array of clients
      const num = 1000;
      let n = 0;
      while (n < num) {
         companies.push({
            name: f.company.companyName(),
            address: f.address.streetAddress(),
            city: f.address.city(),
            province: f.address.stateAbbr(),
            postalCode: f.address.zipCode(),
            country: "Canada"
         });
         n++;
      }
      await this.props.createCompany(companies);
      this.props.toggleModalV2(true, "Done", `${num} new companies created`);
      this.setState({ generating: false });
   };

   payments = async () => {
      this.setState({ generating: true });
      const orders = await this.props.fetchOrder();
      const payments = await this.props.generatePayments(orders);

      const paymentDictionary = payments.reduce((acc, cur) => {
         const { orderID } = cur;
         if (!acc[orderID]) acc[orderID] = [];
         acc[orderID].push(cur);
         return acc;
      }, {});

      for (const key in paymentDictionary) {
         const paymentTotal = paymentDictionary[key].reduce((acc, cur) => {
            const sum = Big(acc).plus(Big(cur.amountPaid || 0));
            return Number(sum);
         }, 0);
         const orderData = { orderID: key, paymentTotal };
         await this.props.updateOrder(orderData);
      }

      this.props.toggleModalV2(
         true,
         "Done",
         `${payments.length} new payments created`
      );
      this.setState({ generating: false });
   };

   render() {
      const { users } = this.props;

      return (
         <div className="card full-height">
            <h2>Admin Dashboard</h2>
            <div style={{ marginTop: 10 }}>
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
                     <div className="section">
                        <h3>Generate Example Data</h3>
                        <div>Generating data may take up to 90 seconds</div>
                        {this.state.generating ? (
                           <div className="loader" />
                        ) : (
                           <div style={{ marginTop: 20 }}>
                              <button
                                 className="ui basic button"
                                 onClick={this.clients}
                              >
                                 Clients
                              </button>
                              <button
                                 className="ui basic button"
                                 onClick={this.companies}
                              >
                                 Companies
                              </button>
                              <button
                                 className="ui basic button"
                                 onClick={this.orders}
                              >
                                 Orders
                              </button>
                              <button
                                 className="ui basic button"
                                 onClick={this.payments}
                              >
                                 Payments
                              </button>
                              <button
                                 className="ui basic button"
                                 onClick={this.inventory}
                              >
                                 Inventory
                              </button>
                           </div>
                        )}
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
                                          <td style={{ padding: "12px 0" }}>
                                             Username:{" "}
                                             <strong>{user.username}</strong>
                                             <br />
                                             Name: {user.firstName}{" "}
                                             {user.lastName}
                                             <br />
                                             Email: {user.email}
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
      fetchClient,
      createCompany,
      generateInventory,
      generateOrder,
      generateRow,
      generatePayments,
      fetchOrder,
      updateOrder,
      createUser,
      fetchUser,
      loadUsers,
      toggleModalV2
   }
)(AdminDashboard);
