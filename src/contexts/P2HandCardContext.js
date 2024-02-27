import React, { createContext, useContext, useState } from 'react';

const P2HandCardContext = createContext();

export const P2HandCardProvider = ({ children }) => {
  const [p2HandCards, setP2HandCards] = useState([]);

  const addP2CardToHand = (card) => {
    setP2HandCards((prevCards) => [...prevCards, card]);
  };

  const removeP2CardFromHand = (index) => {
    setP2HandCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  const clearP2Hand = () => {
    setP2HandCards([]);
  };

  return (
    <P2HandCardContext.Provider
      value={{ p2HandCards, addP2CardToHand, removeP2CardFromHand, clearP2Hand }}
    >
      {children}
    </P2HandCardContext.Provider>
  );
};

export const useP2HandCardContext = () => {
  const context = useContext(P2HandCardContext);
  if (!context) {
    throw new Error(
      'useP2HandCardContext must be used within a P2HandCardProvider'
    );
  }
  return context;
};
