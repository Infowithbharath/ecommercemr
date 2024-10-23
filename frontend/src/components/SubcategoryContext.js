import React, { createContext, useState } from 'react';

// Create the context
export const SubcategoryContext = createContext();

// Create a provider component
export const SubcategoryProvider = ({ children }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  return (
    <SubcategoryContext.Provider value={{ selectedSubcategory, setSelectedSubcategory }}>
      {children}
    </SubcategoryContext.Provider>
  );
};
