import React from 'react';
import { useP1HandCardContext } from '../contexts/P1HandCardContext';
import Card from './card';
import { motion } from 'framer-motion';

const P1Hand = () => {
  // Dummy data for 7 cards
  const cards = [1, 2, 3, 4, 5, 6, 7];
  const { p1HandCards, addCardToHand, removeCardFromHand, clearHand } = useP1HandCardContext();
    console.log(p1HandCards);
  return (
    <div className="p1-hand flex gap-4  p-2 text-primary ">
      {p1HandCards.map((card, index) => (
        <motion.div 
            key={index} 
            className="card w-16 h-20 rounded-sm text-center"
            initial={{ x: `${(7- index) * 100}%`, y: "-100%" }}
            transition={{ type: "spring", duration: 0.5 }}
            animate = {{x:0 , y: 0}}
            >
          {/* Render card content here */}
          <Card _id={card} />
        </motion.div>
      ))}
    </div>
  );
};

export default P1Hand;
