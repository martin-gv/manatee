import React from "react";
import Modal from "../../UI/Shared/Modal";

const RewardsModal = props => {
   const { open, close, client } = props;
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
            <div className="meta">Card #{card.cardNum}</div>
            <div className="ui feed">{points}</div>
            <div>${card.creditEarned}</div>
         </div>
      );
   });

   return (
      <Modal open={open} close={() => close("rewards")}>
         <h3 style={{marginBottom: 20}}>Framing Rewards</h3>
         {cards.length ? cards : (
            <div>No rewards yet</div>
         )}
      </Modal>
   );
};

export default RewardsModal;
