import Big from "big.js";

export function setupOptions(options, category) {
   // options: Array
   // category: String
   return options.filter(el => el.category === category).map(el => ({
      label: el.display,
      value: el._id
   }));
}

// Takes a select option value and converts to an event object
// option: Object
// field: String
export function eventObj(option, field) {
   return { target: { name: field, value: option ? option.value : null } };
}

// Takes state and action from a reducer plus the id field to lookup
// Returns state array with updated values
export function editStore(state, action, idField) {
   const index = state.findIndex(el => el[idField] === action.id);
   const newState = [...state];
   newState[index] = {
      ...newState[index],
      [action.field]: action.value
   };
   return newState;
}

// Optional? Create function to create event object from two inputs

// Takes array and optional number of elements and
// returns true if it contains something or the number of elements specified
export function found(arr, num) {
   return Array.isArray(arr) && (num ? arr.length === num : arr.length);
}

export function findByID(arr, field, id) {
   return arr.find(el => +el[field] === +id);
}

// Takes array and returns highest value in specified field
// Returns 0 if no items in the array
export function max(arr, field) {
   return Math.max(0, ...arr.map(el => el[field]));
}

export function randPrice(max) {
   // fix so max is inclusive
   return Number((Math.random() * max).toFixed(2));
}

export function calculateTotal(arr) {
   // write and use where needed
}

// Takes array and returns sum of a field
export function sum(arr, field) {
   return arr.reduce((acc, cur) => {
      const sum = Big(acc).plus(Big(cur[field] || 0));
      return Number(sum);
   }, 0);
}

export function add(num1, num2) {
   // generic function for adding values
   const sum = Big(num1).plus(Big(num2));
   return Number(sum);
}

export function chunk(arr, len) {
   var chunks = [],
      i = 0,
      n = arr.length;
   while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
   }
   return chunks;
}
