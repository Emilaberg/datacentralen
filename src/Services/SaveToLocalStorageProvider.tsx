import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AlgostorageType, AlgoToLocalStorageType, LocalStorageContextType } from "../Types/types";
import { useAlgorithm } from "./AlgorithmProvider";
import { QueryClient, useQuery } from "@tanstack/react-query";

const localStorageContext = createContext<LocalStorageContextType | undefined>(
  undefined
);

const SaveToLocalStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  
  const [test, setTest] = useState("");

  const [savedRuns, setSavedRuns] = useState<Array<AlgoToLocalStorageType> | []>(() => getItem("runs"));

  function saveItem(key:string, item: AlgoToLocalStorageType | Array<object>) {
    if(key=== "runs") {
        const runs = getItem(key) as AlgostorageType;
        if(!runs) {
            localStorage.setItem(key,JSON.stringify([item]));
            return;
        }
        runs.push(item as AlgoToLocalStorageType);

        localStorage.setItem(key,JSON.stringify(runs));
        return;
    }
    localStorage.setItem(key,JSON.stringify(item));
  }

  //TODO 
  // gör till en knapp som man spara från calculatorn, för just nu så ser inte state variablen att det är uppdaterade
  // gissar något med useMemo som inte uppdaterar providern, har ingen aning annars.

 
  function getItem(key: string): Array<AlgoToLocalStorageType> | [] {
    const item = localStorage.getItem(key);

    if(!item) return []

    const parsedItem = JSON.parse(item);

    return parsedItem;
  }

  const contextValues = useMemo(() => ({ test, setTest,saveItem, getItem, savedRuns,setSavedRuns }), [test, setTest,saveItem,getItem,savedRuns,setSavedRuns]);

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
