import React, { Component } from "react";
import { connect } from "react-redux";

export default function withAuth(InputComponent) {
   class Authenticate extends Component {
      componentWillMount() {
         if (!this.props.isAuthenticated) {
            this.props.history.push("/nope");
         }
      }

      componentWillUpdate(nextProps) {
         if (!nextProps.isAuthenticated) {
            this.props.history.push("/nope");
         }
      }

      render() {
         return <InputComponent {...this.props} />;
      }
   }

   function mapStateToProps(state) {
      return {
         isAuthenticated: state.users.isAuthenticated
      };
   }

   return connect(mapStateToProps)(Authenticate);
}
