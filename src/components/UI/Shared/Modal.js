import React from "react";
import { Motion, spring } from "react-motion";

const modalStyle = {
   position: "fixed",
   top: "25%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   minWidth: 350
};

const overlayStyle = {
   position: "fixed",
   top: 0,
   left: 0,
   width: "100%",
   height: "100%",
   backgroundColor: "rgba(0, 0, 0, 0.50)"
};

const Modal = props => {
   return (
      <Motion
         style={{
            opacity: spring(props.open ? 1 : 0),
            z: props.open ? 999 : -999
         }}
      >
         {style => (
            <div>
               <div
                  className="card"
                  style={{
                     ...modalStyle,
                     opacity: style.opacity,
                     zIndex: style.z + 1
                  }}
               >
                  {props.children}
               </div>
               <div
                  className="modal-overlay"
                  style={{
                     ...overlayStyle,
                     opacity: style.opacity,
                     zIndex: style.z
                  }}
                  onClick={props.close}
               />
            </div>
         )}
      </Motion>
   );
};

export default Modal;
