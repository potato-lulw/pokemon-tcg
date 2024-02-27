import React, { createContext, useContext, useState } from 'react';

const P1HandCardContext = createContext();

export const P1HandCardProvider = ({ children }) => {
  const [p1HandCards, setP1HandCards] = useState([]);

  const addCardToHand = (card) => {
    setP1HandCards((prevCards) => [...prevCards, card]);
  };

  const removeCardFromHand = (index) => {
    setP1HandCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards.splice(index, 1);
      return updatedCards;
    });
  };

  const clearHand = () => {
    setP1HandCards([]);
  };

  return (
    <P1HandCardContext.Provider
      value={{ p1HandCards, addCardToHand, removeCardFromHand, clearHand }}
    >
      {children}
    </P1HandCardContext.Provider>
  );
};

export const useP1HandCardContext = () => {
  const context = useContext(P1HandCardContext);
  if (!context) {
    throw new Error(
      'useP1HandCardContext must be used within a P1HandCardProvider'
    );
  }
  return context;
};
