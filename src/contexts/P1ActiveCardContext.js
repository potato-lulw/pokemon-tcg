import React, { createContext, useContext, useState } from 'react';

const P1ActiveCardContext = createContext();

export const P1ActiveCardProvider = ({ children }) => {
  const [p1ActiveCard, setP1ActiveCard] = useState(null);

  const setPlayCard = (card) => {
    setP1ActiveCard(card);
  };

  const removeActiveCard = () => {
    setP1ActiveCard(null);
  };

  return (
    <P1ActiveCardContext.Provider
      value={{ p1ActiveCard, setPlayCard, removeActiveCard }}
    >
      {children}
    </P1ActiveCardContext.Provider>
  );
};

export const useP1ActiveCardContext = () => {
  const context = useContext(P1ActiveCardContext);
  if (!context) {
    throw new Error(
      'useP1ActiveCardContext must be used within a P1ActiveCardProvider'
    );
  }
  return context;
};
