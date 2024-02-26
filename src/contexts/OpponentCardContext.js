import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
const OppBenchCardsContext = createContext({
    oppBenchCards: [],
    setOppBenchCards: () => {},
});

// Create a custom provider component
export const OppBenchCardsProvider = ({ children }) => {
    const [oppBenchCards, setOppBenchCards] = useState([]);

    return (
        <OppBenchCardsContext.Provider value={{ oppBenchCards, setOppBenchCards }}>
            {children}
        </OppBenchCardsContext.Provider>
    );
};

// Create a custom hook to access the context values
export const useOppBenchCards = () => {
    return useContext(OppBenchCardsContext);
};
