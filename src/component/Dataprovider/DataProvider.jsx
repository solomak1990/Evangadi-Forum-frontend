import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <DataContext.Provider value={[userData, setUserData]}>
      {children}
    </DataContext.Provider>
  );
};
