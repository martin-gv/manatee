import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../images/manatee.png";

import "./Sidebar.css";

const Sidebar = () => {
   return (
      <div className="sidebar">
         <Link to="/" className="app-logo">
            <img src={Logo} alt="Manatee Home" />
         </Link>
         <div className="nav-links">
            <NavLink to="/dashboard">
               <i className="material-icons">dashboard</i>
               Dashboard
            </NavLink>
            <NavLink to="/clients">
               <i className="material-icons">person</i>
               Clients
            </NavLink>
            <NavLink to="/companies">
               <i className="material-icons">business</i>
               Companies
            </NavLink>
            <NavLink to="/orders">
               <i className="material-icons">shopping_cart</i>
               Orders
            </NavLink>
            <NavLink to="/payments">
               <i className="material-icons">payment</i>
               Payments
            </NavLink>
            <NavLink to="/inventory">
               <i className="material-icons">burst_mode</i>
               Inventory
            </NavLink>
            <NavLink to="/pricing">
               <i className="material-icons">list_alt</i>
               Quotes
            </NavLink>
            <NavLink to="/admin">
               <i className="material-icons">security</i>
               Admin
            </NavLink>
         </div>
      </div>
   );
};

export default Sidebar;
