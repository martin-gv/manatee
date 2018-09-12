import React from "react";
import { Link } from "react-router-dom";

import { Icon, Menu, Sidebar } from "semantic-ui-react";

const SidebarMenu = () => (
   <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={true}
      width="thin"
   >
      <Menu.Item as={Link} to="/clients">
         <Icon name="user" />
         Clients
      </Menu.Item>
      <Menu.Item as={Link} to="/companies">
         <Icon name="building" />
         Companies
      </Menu.Item>
      <Menu.Item as={Link} to="/orders">
         <Icon name="shopping cart" />
         Orders
      </Menu.Item>
      <Menu.Item as={Link} to="/payments">
         <Icon name="dollar" />
         Payments
      </Menu.Item>
      <Menu.Item as={Link} to="/inventory">
         <Icon name="image" />
         Inventory
      </Menu.Item>
      <Menu.Item as={Link} to="/pricing">
         <Icon name="calculator" />
         Pricing Program
      </Menu.Item>
   </Sidebar>
);

export default SidebarMenu;
