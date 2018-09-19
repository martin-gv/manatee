import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

const RewardsModal = props => {
   const { isOpen, toggle, submit, client } = props;
   const framingRewards = client ? client.framingRewards : [];

   const cards = framingRewards.map(card => {
      const points = card.points.map(point => {
         return (
            <div className="event" key={point._id}>
               <div className="content">
                  <div className="summary">
                     #{point.pointNum} {point.orderID} ${point.amount}
                  </div>
               </div>
            </div>
         );
      });
      return (
         <div className="ui card" key={card._id}>
            <div className="content">
               <div className="meta">Card #{card.cardNum}</div>
               <div className="ui feed">{points}</div>
               <div className="extra content">$ {card.creditEarned}</div>
            </div>
         </div>
      );
   });

   return (
      <Modal isOpen={isOpen} toggle={() => toggle("rewards")} centered>
         <ModalHeader>Framing Rewards</ModalHeader>
         <form className="ui form" onSubmit={submit}>
            <ModalBody>{cards}</ModalBody>
            <ModalFooter>
               {/* <button className="ui green button">Save</button> */}
            </ModalFooter>
         </form>
      </Modal>
   );
};

export default RewardsModal;
