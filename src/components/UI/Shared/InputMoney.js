import React from "react";

const InputMoney = props => {
   const { value, onChange } = props;
   return (
      <input
         type="number"
         // prop for name?
         name="amount"
         className="form-control"
         min="0"
         step="0.01"
         // prop for required?
         required="true"
         // prop for placeholder?
         placeholder="Amount"
         value={value}
         onChange={e => onChange(e.target.value)}
      />
   );
};

export default InputMoney;
