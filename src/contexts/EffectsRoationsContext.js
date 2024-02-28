import React, { createContext, useContext, useState, useMemo } from 'react';

// Create the context
const EffectRotationContext = createContext();

// Create a custom hook to use the context
export const useEffectRotationContext = () => {
  const context = useContext(EffectRotationContext);
  if (!context) {
    throw new Error('useEffectRotationContext must be used within an EffectRotationProvider');
  }
  return context;
};

// Create the provider component
export const EffectRotationProvider = ({ children }) => {
  const [effects, setEffects] = useState({});
  const [rotations, setRotations] = useState({});

  const value = useMemo(() => ({
    effects,
    setEffects,
    rotations,
    setRotations,
  }), [effects, rotations]);

  return (
    <EffectRotationContext.Provider value={value}>
      {children}
    </EffectRotationContext.Provider>
  );
};
