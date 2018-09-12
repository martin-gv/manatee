import React from "react";

const FormField = props => {
   const { field, value, onChange } = props;

   return (
      <div className="field">
         <label>{field}</label>
         <input name={field} value={value || ""} onChange={onChange} />
      </div>
   );
};

export default FormField;
