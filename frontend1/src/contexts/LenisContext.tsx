import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LenisContextType {
  isLenisEnabled: boolean;
  setIsLenisEnabled: (isEnabled: boolean) => void;
}

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used within a LenisProvider');
  }
  return context;
};

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [isLenisEnabled, setIsLenisEnabled] = useState(true);

  return (
    <LenisContext.Provider value={{ isLenisEnabled, setIsLenisEnabled }}>
      {children}
    </LenisContext.Provider>
  );
};
