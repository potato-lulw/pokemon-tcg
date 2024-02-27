import React, { useState, useEffect } from 'react';
import { useP1HandCardContext } from '../contexts/P1HandCardContext';
import Card from './card';
import { motion } from 'framer-motion';
import { FaCaretRight } from "react-icons/fa";
import { FaCaretLeft } from "react-icons/fa";
import { useBenchCards } from '../contexts/BenchCardContext';

const P1Hand = () => {
  const cardsPerPage =  7;
  const { p1HandCards, addCardToHand, removeCardFromHand, clearHand } = useP1HandCardContext();
  const [currentPage, setCurrentPage] = useState(0);
  const { benchCards, setBenchCards } = useBenchCards();

  // Calculate the total number of pages
  const totalCards = p1HandCards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  // Set the initial page to the last page
  useEffect(() => {
    setCurrentPage(totalPages -  1);
  }, [totalPages]);

  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, totalCards);
  const visibleCards = p1HandCards.slice(startIndex, endIndex);

  const handleHandCardClick = (_id, visibleIndex) => {
    const globalIndex = visibleIndex + currentPage * cardsPerPage;
    removeCardFromHand(globalIndex);
    setTimeout(() => {
      setBenchCards([...benchCards, _id]);
    },  300);
  }

  return (
    <div className="p1-hand flex gap-4 p-2 text-primary">
      <button onClick={() => setCurrentPage((prev) => Math.max(prev -  1,  0))}><FaCaretLeft className='text-white text-4xl bg-primary rounded-lg'/></button>
      {visibleCards.map((card, index) => (
        <motion.div   
            key={index}   
            className="card w-16 h-20 rounded-sm text-center"
            initial={{ x: `${(7 - index) *  100}%`, y: "-100%" }}
            transition={{ type: "spring", duration:  0.5 }}
            animate = {{x:  0, y:  0}}
            whileHover={{scale:  1.2}}
            onClick={() => handleHandCardClick(card, index)}
            >
          <Card _id={card} />
        </motion.div>
      ))}
      <button onClick={() => setCurrentPage((prev) => Math.min(prev +  1, totalPages -  1))}><FaCaretRight className='text-white text-4xl bg-primary rounded-lg'/></button>
    </div>
  );
};

export default P1Hand;
