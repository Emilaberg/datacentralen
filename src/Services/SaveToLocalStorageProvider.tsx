import React, { createContext, useContext, useMemo, useState } from "react";
import { LocalStorageContextType } from "../Types/types";

const localStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const SaveToLocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [test, setTest] = useState("");

  




  function saveItem(item: string) {
    localStorage.setItem("item",JSON.stringify(item));
  }


  function getItem(key: string): string | object {
    const item = localStorage.getItem(key);

    if(!item) return "nothing found"

    const parsedItem = JSON.parse(item);

    return parsedItem;
  }

  const contextValues = useMemo(() => ({ test, setTest,saveItem, getItem }), [test, setTest,saveItem,getItem]);

  return (
    <localStorageContext.Provider value={contextValues}>
      {children}
    </localStorageContext.Provider>
  );
};

export const useLocalStorageProvider = () => {
  const context = useContext(localStorageContext);

  if (!context) {
    throw new Error(
      "useLocalStorage needs to be used within an localStorageProvider"
    );
  }
  return context;
};

export default SaveToLocalStorageProvider;
