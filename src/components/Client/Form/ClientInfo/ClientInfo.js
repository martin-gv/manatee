import React from "react";

const ClientInfo = props => {
   const { client, onChange, onSubmit } = props;
   const {
      firstName,
      lastName,
      phone,
      email,
      address,
      city,
      province,
      postalCode,
      country
   } = client || {};

   return (
      <form className="ui form" onSubmit={onSubmit}>
         <div className="field">
            <label>Name</label>
            <div className="two fields">
               <div className="field">
                  <input
                     type="text"
                     name="firstName"
                     value={firstName || ""}
                     onChange={({ target }) =>
                        onChange(target.name, target.value)
                     }
                     placeholder="First Name"
                  />
               </div>
               <div className="field">
                  <input
                     type="text"
                     name="lastName"
                     value={lastName || ""}
                     onChange={({ target }) =>
                        onChange(target.name, target.value)
                     }
                     placeholder="Last Name"
                  />
               </div>
            </div>
         </div>
         <div className="two fields">
            <div className="field">
               <label>Phone</label>
               <input
                  type="number"
                  name="phone"
                  value={phone || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
            <div className="field">
               <label>Email</label>
               <input
                  type="email"
                  name="email"
                  value={email || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
         </div>
         <div className="two fields">
            <div className="field">
               <label>Address</label>
               <input
                  type="text"
                  name="address"
                  value={address || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
            <div className="field">
               <label>City</label>
               <input
                  type="text"
                  name="city"
                  value={city || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
         </div>
         <div className="two fields">
            <div className="field">
               <label>Province</label>
               <input
                  type="text"
                  name="province"
                  value={province || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
            <div className="field">
               <label>Postal Code</label>
               <input
                  type="text"
                  name="postalCode"
                  value={postalCode || ""}
                  onChange={({ target }) => onChange(target.name, target.value)}
               />
            </div>
         </div>
         <div className="field">
            <label>Country</label>
            <input
               type="text"
               name="country"
               value={country || ""}
               onChange={({ target }) => onChange(target.name, target.value)}
            />
         </div>
         <button className="ui green basic button">
            <i className="material-icons">save</i>
            Save
         </button>
      </form>
   );
};

export default ClientInfo;
