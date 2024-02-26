import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const BenchCardsContext = createContext({
    benchCards: [],
    setBenchCards: () => {},
});

// Create a custom provider component
export const BenchCardsProvider = ({ children }) => {
    const [benchCards, setBenchCards] = useState([]);

    return (
        <BenchCardsContext.Provider value={{ benchCards, setBenchCards }}>
            {children}
        </BenchCardsContext.Provider>
    );
};

// Create a custom hook to access the context values
export const useBenchCards = () => {
    return useContext(BenchCardsContext);
};
