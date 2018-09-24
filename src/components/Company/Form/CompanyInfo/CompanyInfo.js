import React from "react";

import FormField from "./FormField";

const CompanyInfo = props => {
   const fields = props.form.map(el => (
      <FormField
         key={el.name}
         field={el.name}
         value={props.company[el.name]}
         label={el.label}
         onChange={({ target }) => props.onChange(target.name, target.value)}
      />
   ));

   return (
      <form
         className="ui form"
         onSubmit={e => props.onSubmit(e, props.company)}
      >
         {fields}
         <button className="ui green basic button">
            <i className="material-icons">save</i>
            Save
         </button>
      </form>
   );
};

export default CompanyInfo;
