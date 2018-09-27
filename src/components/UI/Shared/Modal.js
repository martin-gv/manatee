import React from "react";
import { Motion, spring } from "react-motion";

const modalStyle = {
   position: "fixed",
   top: 0,
   marginTop: 60,
   left: "50%",
   transform: "translate(-50%)",
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
   const zModifier = props.zModifier || 0;
   return (
      <Motion
         style={{
            opacity: spring(props.open ? 1 : 0),
            z: props.open ? 500 : -500
         }}
      >
         {style => (
            <div>
               <div
                  className="card"
                  style={{
                     ...modalStyle,
                     opacity: style.opacity,
                     ...props.cardStyle,
                     zIndex: style.z + 1 + zModifier
                  }}
               >
                  {props.children}
               </div>
               <div
                  className="modal-overlay"
                  style={{
                     ...overlayStyle,
                     opacity: style.opacity,
                     zIndex: style.z + zModifier
                  }}
                  onClick={props.close}
               />
            </div>
         )}
      </Motion>
   );
};

export default Modal;
